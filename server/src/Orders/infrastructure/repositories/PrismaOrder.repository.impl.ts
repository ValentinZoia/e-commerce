import prisma from "../../../shared/infrastructure/database/prismaClient";
import { Order as OrderPrisma, Prisma } from "../../../generated/prisma";
import {
  IOrderRepository,
  OrdersGetAllQueryOptions,
} from "../../domain/interfaces";
import {
  Order,
  OrderBuilder,
  OrderItemBuilder,
  WhatsAppStatusNames,
  WhatsAppStatus,
} from "../../domain/entities";
import {
  GetAllItemsResult,
  GetAllQueryOptionsBase,
} from "../../../Products/domain/interfaces";

type OrderPrismaWithItems = Prisma.OrderGetPayload<{
  include: { products: true };
}>;

export class PrismaOrderRepositoryImpl implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    const createdOrder = await prisma.order.create({
      data: {
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        customerNotes: order.customerNotes,
        whatsappMessage: order.whatsappMessage,
        whatsappStatus: order.whatsappStatus,
        paymentMethod: order.paymentMethod,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        total: order.total,
        isFreeShipping: order.isFreeShipping,
        isCashDiscount: order.isCashDiscount,
        cashDiscountPercentage: order.cashDiscountPercentage,
        installments: order.installments,
        whatsappSentAt: order.whatsappSentAt,
        completedAt: order.completedAt,
        expiredAt: order.expiredAt,
        products: {
          create: order.products.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            size: item.size,
            unitPrice: item.unitPrice,
            discount: item.discount,
            imageUrl: item.imageUrl,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return this.mapPrismaToOrder(createdOrder);
  }
  async update(id: string, order: Order): Promise<Order> {
    // Realizar la actualización en una transacción
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // 1. Eliminar los OrderItems existentes
      await tx.orderItem.deleteMany({
        where: { orderId: id },
      });

      // 2. Actualizar la orden y crear los nuevos OrderItems
      const updated = await tx.order.update({
        where: { id },
        data: {
          customerPhone: order.customerPhone,
          customerEmail: order.customerEmail,
          customerName: order.customerName,
          customerNotes: order.customerNotes,
          whatsappMessage: order.whatsappMessage,
          whatsappStatus: order.whatsappStatus,
          paymentMethod: order.paymentMethod,
          subtotal: order.subtotal,
          shippingCost: order.shippingCost,
          total: order.total,
          isFreeShipping: order.isFreeShipping,
          whatsappSentAt: order.whatsappSentAt,
          completedAt: order.completedAt,
          expiredAt: order.expiredAt,
          products: {
            create: order.products.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              quantity: item.quantity,
              size: item.size,
              unitPrice: item.unitPrice,
              discount: item.discount,
              imageUrl: item.imageUrl,
            })),
          },
        },
        include: {
          products: true,
        },
      });

      return updated;
    });

    // Mapear el resultado de Prisma a nuestra entidad Order
    return this.mapPrismaToOrder(updatedOrder);
  }
  async updateWhatsAppStatus(
    id: string,
    status: WhatsAppStatusNames
  ): Promise<Order> {
    const wStatus = this.parseWhatsAppStatus(status);
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        whatsappStatus: wStatus,
        whatsappSentAt: new Date(),
      },
      include: {
        products: true,
      },
    });
    return this.mapPrismaToOrder(updatedOrder);
  }
  async delete(id: string): Promise<void> {
    await prisma.order.delete({
      where: { id },
    });
  }
  async findAll(
    options?: OrdersGetAllQueryOptions
  ): Promise<GetAllItemsResult<Order>> {
    const where: any = {};
    if (options?.customerPhone) {
      where.customerPhone = {
        contains: options.customerPhone,
        mode: "insensitive",
      };
    }
    if (options?.customerEmail) {
      where.customerEmail = {
        contains: options.customerEmail,
        mode: "insensitive",
      };
    }
    if (options?.customerName) {
      where.customerName = {
        contains: options.customerName,
        mode: "insensitive",
      };
    }
    if (options?.status) {
      where.whatsappStatus = options.status;
    }
    if (options?.productId) {
      where.products = {
        some: {
          productId: options.productId,
        },
      };
    }

    if (options?.search) {
      where.OR = [
        { customerName: { contains: options.search, mode: "insensitive" } },
        { customerEmail: { contains: options.search, mode: "insensitive" } },
        { customerPhone: { contains: options.search, mode: "insensitive" } },
      ];
    }

    const orderBy = options?.sortBy
      ? { [options.sortBy]: options.sortDir || "desc" }
      : { ["createdAt"]: options?.sortDir || "desc" };
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        take: options?.take,
        skip: options?.skip,
        orderBy: orderBy,
        include: {
          products: true,
        },
      }),
      prisma.order.count({
        where,
      }),
    ]);

    return {
      items: orders.map((order) => this.mapPrismaToOrder(order)),
      total,
    };
  }
  async findByCustomerEmail(email: string): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      where: { customerEmail: email },
      include: {
        products: true,
      },
    });
    if (!orders) return null;
    return orders.map((order) => this.mapPrismaToOrder(order));
  }
  async findByCustomerName(name: string): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      where: { customerName: name },
      include: {
        products: true,
      },
    });
    if (!orders) return null;
    return orders.map((order) => this.mapPrismaToOrder(order));
  }
  async findByCustomerPhone(phone: string): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      where: { customerPhone: phone },
      include: {
        products: true,
      },
    });
    if (!orders) return null;
    return orders.map((order) => this.mapPrismaToOrder(order));
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
    if (!order) return null;

    return this.mapPrismaToOrder(order);
  }
  async findByProductId(productId: string): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      where: { products: { some: { productId } } },
      include: {
        products: true,
      },
    });
    if (!orders) return null;
    return orders.map((order) => this.mapPrismaToOrder(order));
  }
  async findByStatus(status: string): Promise<Order[] | null> {
    const wStatus = this.parseWhatsAppStatus(status);
    const orders = await prisma.order.findMany({
      where: { whatsappStatus: wStatus },
      include: {
        products: true,
      },
    });
    if (!orders) return null;
    return orders.map((order) => this.mapPrismaToOrder(order));
  }
  private mapPrismaToOrder(prismaOrder: OrderPrismaWithItems): Order {
    return new OrderBuilder()
      .setId(prismaOrder.id)
      .setCustomerPhone(prismaOrder.customerPhone)
      .setCustomerEmail(prismaOrder.customerEmail)
      .setCustomerName(prismaOrder.customerName)
      .setCustomerNotes(prismaOrder.customerNotes)
      .setProducts(
        prismaOrder.products.map((item: any) =>
          new OrderItemBuilder()
            .setId(item.id)
            .setOrderId(item.orderId)
            .setProductId(item.productId)
            .setProductName(item.productName)
            .setQuantity(item.quantity)
            .setSize(item.size)
            .setUnitPrice(item.unitPrice)
            .setDiscount(item.discount)
            .setImageUrl(item.imageUrl)
            .build()
        )
      )
      .setWhatsappMessage(prismaOrder.whatsappMessage)
      .setWhatsappStatus(this.parseWhatsAppStatus(prismaOrder.whatsappStatus))
      .setPaymentMethod(prismaOrder.paymentMethod)
      .setSubtotal(prismaOrder.subtotal)
      .setShippingCost(prismaOrder.shippingCost)
      .setTotal(prismaOrder.total)
      .setIsFreeShipping(prismaOrder.isFreeShipping)
      .setIsCashDiscount(prismaOrder.isCashDiscount)
      .setCashDiscountPercentage(prismaOrder.cashDiscountPercentage)
      .setInstallments(prismaOrder.installments)
      .setCreatedAt(new Date(prismaOrder.createdAt))
      .setUpdatedAt(new Date(prismaOrder.updatedAt))
      .setWhatsappSentAt(
        prismaOrder.whatsappSentAt ? new Date(prismaOrder.whatsappSentAt) : null
      )
      .setCompletedAt(
        prismaOrder.completedAt ? new Date(prismaOrder.completedAt) : null
      )
      .setExpiredAt(
        prismaOrder.expiredAt ? new Date(prismaOrder.expiredAt) : null
      )
      .build();
  }
  private parseWhatsAppStatus(status: string): WhatsAppStatus {
    const validStatuses: WhatsAppStatus[] = [
      WhatsAppStatusNames.PENDING,
      WhatsAppStatusNames.SENT,
      WhatsAppStatusNames.RESPONDED,
      WhatsAppStatusNames.COMPLETED,
    ];

    if (validStatuses.includes(status as WhatsAppStatus)) {
      return status as WhatsAppStatus;
    }

    // Valor por defecto si no coincide
    console.warn(`Invalid whatsappStatus: ${status}, defaulting to PENDING`);
    return WhatsAppStatusNames.PENDING;
  }
}
