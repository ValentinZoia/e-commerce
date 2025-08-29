import { CustomError } from "../../../shared/domain/errors";
import { Order } from "../../domain/entities/Order.entity";
import {
  IOrderSendMessage,
  Return,
} from "../../domain/interfaces/IOrderSendMessage.interface";
import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import fs from "fs";

import path from "path";

export enum WhatsAppStatus {
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
  QR_PENDING = "qr_pending",
  AUTHENTICATING = "authenticating",
  READY = "ready",
  ERROR = "error",
}

interface QueuedMessage {
  order: Order;
  resolve: (value: Return) => void;
  reject: (error: Error) => void;
  timestamp: number;
  retries: number;
}

export class SendMessageToCustomerByWhatsApp implements IOrderSendMessage {
  private client: Client;
  private status: WhatsAppStatus = WhatsAppStatus.DISCONNECTED;
  private messageQueue: QueuedMessage[] = [];
  private maxRetries = 3;
  private queueTimeout = 5 * 60 * 1000; // 5 minutos
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private qrPath: string;

  private initializeClient() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    this.setupEventListeners();
    this.startClient();
  }

  constructor() {
    this.qrPath = path.join(process.cwd(), "tmp", "qr.svg");
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    //Para desconectar la session descomentar lo siguiente y comentar lo de abajo.
    this.handleAuthFailure();
    this.handleDisconnection();

    //lo de abajo.
    // this.setupEventListeners();
    // this.startClient();
  }

  private setupEventListeners() {
    this.client.on("loading_screen", (percent, message) => {
      console.log(`📱 Cargando WhatsApp: ${percent}% - ${message}`);
      this.status = WhatsAppStatus.CONNECTING;
    });

    this.client.on("authenticated", () => {
      console.log("🔐 WhatsApp autenticado exitosamente");
      this.status = WhatsAppStatus.AUTHENTICATING;
      this.reconnectAttempts = 0;
    });

    this.client.on("ready", () => {
      this.status = WhatsAppStatus.READY;
      console.log("✅ WhatsApp listo para enviar mensajes");
      this.processMessageQueue();
    });

    this.client.on("qr", (qr) => {
      this.status = WhatsAppStatus.QR_PENDING;
      console.log("📱 QR generado - Escanea el código en la carpeta tmp");
      this.generateQrImage(qr);
      this.notifyQrGenerated();
    });

    this.client.on("auth_failure", (msg) => {
      this.status = WhatsAppStatus.ERROR;
      console.error("❌ Falló autenticación WhatsApp:", msg);
      this.handleAuthFailure();
    });

    this.client.on("disconnected", (reason) => {
      this.status = WhatsAppStatus.DISCONNECTED;
      console.log(`⚠️ WhatsApp desconectado: ${reason}`);
      this.handleDisconnection();
    });
  }

  private async startClient() {
    try {
      console.log("🚀 Iniciando cliente WhatsApp...");
      this.status = WhatsAppStatus.CONNECTING;
      await this.client.initialize();
    } catch (error) {
      console.error("💥 Error inicializando cliente:", error);
      this.status = WhatsAppStatus.ERROR;
      await this.handleReconnection();
    }
  }

  async sendMsj(order: Order): Promise<Return> {
    // Si está listo, enviar inmediatamente
    if (this.status === WhatsAppStatus.READY) {
      return this.sendMessageNow(order);
    }

    // Si no está listo, encolar mensaje
    return this.enqueueMessage(order);
  }

  private async sendMessageNow(order: Order): Promise<Return> {
    try {
      const phoneNumber = this.normalizePhone(order.customerPhone);
      const message = order.generateWhatsAppMessage();

      const response = await this.client.sendMessage(phoneNumber, message);
      console.log(`📤 Mensaje enviado exitosamente a ${phoneNumber}`);

      return {
        success: true,
        data: { id: response.id.id },
      };
    } catch (error: any) {
      console.error("💥 Error enviando mensaje:", error);
      throw CustomError.badRequest(`Error al enviar mensaje: ${error.message}`);
    }
  }

  private enqueueMessage(order: Order): Promise<Return> {
    return new Promise((resolve, reject) => {
      const queuedMessage: QueuedMessage = {
        order,
        resolve,
        reject,
        timestamp: Date.now(),
        retries: 0,
      };

      this.messageQueue.push(queuedMessage);
      console.log(`📬 Mensaje encolado (${this.messageQueue.length} en cola)`);

      // Limpiar mensajes expirados
      this.cleanExpiredMessages();

      // Intentar reconectar si es necesario
      if (
        this.status === WhatsAppStatus.DISCONNECTED ||
        this.status === WhatsAppStatus.ERROR
      ) {
        this.handleReconnection();
      }
    });
  }

  private async processMessageQueue() {
    console.log(`📨 Procesando ${this.messageQueue.length} mensajes en cola`);

    const messages = [...this.messageQueue];
    this.messageQueue = [];

    for (const queuedMessage of messages) {
      try {
        const result = await this.sendMessageNow(queuedMessage.order);
        queuedMessage.resolve(result);
      } catch (error) {
        queuedMessage.retries++;

        if (queuedMessage.retries < this.maxRetries) {
          console.log(
            `🔄 Reintentando mensaje (${queuedMessage.retries}/${this.maxRetries})`
          );
          this.messageQueue.push(queuedMessage);
        } else {
          console.error(
            `💥 Mensaje falló después de ${this.maxRetries} intentos`
          );
          queuedMessage.reject(error as Error);
        }
      }
    }
  }

  private cleanExpiredMessages() {
    const now = Date.now();
    const validMessages = this.messageQueue.filter((msg) => {
      const isExpired = now - msg.timestamp > this.queueTimeout;
      if (isExpired) {
        console.log("⏰ Mensaje expirado, eliminando de cola");
        msg.reject(new Error("Timeout: Mensaje expirado en cola"));
      }
      return !isExpired;
    });

    this.messageQueue = validMessages;
  }

  private async handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(
        `🚫 Máximo de reconexiones alcanzado (${this.maxReconnectAttempts})`
      );
      this.rejectAllQueuedMessages(
        new Error("Max reconnection attempts reached")
      );
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Backoff exponencial

    console.log(
      `🔄 Reintentando conexión ${this.reconnectAttempts}/${this.maxReconnectAttempts} en ${delay}ms`
    );

    setTimeout(async () => {
      await this.client.destroy();
      this.initializeClient();
    }, delay);
  }

  private handleAuthFailure() {
    console.log("🧹 Limpiando sesión por fallo de autenticación");
    // Limpiar cache de autenticación
    const authPath = path.join(process.cwd(), ".wwebjs_auth");
    if (fs.existsSync(authPath)) {
      fs.rmSync(authPath, { recursive: true, force: true });
      console.log("🗑️ Cache de autenticación eliminado");
    }

    this.handleReconnection();
  }

  private handleDisconnection() {
    console.log("🔌 Manejando desconexión...");
    // Esperar un momento antes de intentar reconectar
    setTimeout(() => {
      if (this.status === WhatsAppStatus.DISCONNECTED) {
        this.handleReconnection();
      }
    }, 3000);
  }

  private generateQrImage(qr: string) {
    const dir = path.dirname(this.qrPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const qrSvg = imageQr(qr, { type: "svg", margin: 4 });
    qrSvg.pipe(fs.createWriteStream(this.qrPath));

    console.log(`📱 QR guardado en: ${this.qrPath}`);
  }

  private notifyQrGenerated() {
    // Aquí podrías integrar notificaciones (email, webhook, etc.)
    console.log("🔔 ACCIÓN REQUERIDA: Escanea el código QR para continuar");
    console.log(`📂 Ubicación del QR: ${this.qrPath}`);

    // Ejemplo: podrías enviar un webhook o email aquí
    // await this.notificationService.sendQrNotification(this.qrPath);
  }

  private rejectAllQueuedMessages(error: Error) {
    console.log(`💥 Rechazando ${this.messageQueue.length} mensajes en cola`);
    this.messageQueue.forEach((msg) => msg.reject(error));
    this.messageQueue = [];
  }

  // Métodos públicos para obtener información del estado
  getStatus(): WhatsAppStatus {
    return this.status;
  }

  getQueuedMessageCount(): number {
    return this.messageQueue.length;
  }

  isReady(): boolean {
    return this.status === WhatsAppStatus.READY;
  }

  needsQrScan(): boolean {
    return this.status === WhatsAppStatus.QR_PENDING;
  }

  getQrPath(): string | null {
    return this.needsQrScan() ? this.qrPath : null;
  }

  // Método para limpiar recursos
  async destroy() {
    console.log("🧹 Limpiando recursos de WhatsApp...");
    this.rejectAllQueuedMessages(new Error("Service shutting down"));
    await this.client.destroy();
  }

  private normalizePhone(phone: string): string {
    // Limpiar caracteres que no sean dígitos
    const clean = phone.replace(/\D/g, "");

    // Si ya empieza con 549 -> está ok
    if (clean.startsWith("549")) {
      return `${clean}@c.us`;
    }

    // Si empieza con 54 pero no tiene el 9 de celular, agregarlo
    if (clean.startsWith("54") && !clean.startsWith("549")) {
      return `549${clean.slice(2)}@c.us`;
    }

    // Si empieza con 11 (número local CABA)
    if (clean.length === 10 && clean.startsWith("11")) {
      return `549${clean}@c.us`;
    }

    // Si es un número de 8 dígitos (viejo formato sin prefijo)
    if (clean.length === 8) {
      return `54911${clean}@c.us`;
    }

    throw new Error(`Formato de número no válido: ${phone}`);
  }
}
