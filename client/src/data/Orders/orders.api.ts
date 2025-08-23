import { DBResponseQuery, DBResponseCommand } from "@/types";
import instance from "@/lib/axios";
import axios from "axios";
import { GetOrdersParams, Order } from "@/types/order";
import { OrderFormValues } from "@/lib/zod-schemas/orderSchema";
const API_URL = "api/orders";

export async function getOrders(
  params: GetOrdersParams
): Promise<DBResponseQuery<Order>> {
  try {
    const {
      page,
      limit,
      search,
      customerEmail,
      customerName,
      customerPhone,
      productId,
      status,
      sortBy,
      sortDir,
    } = params;
    const skip = (page - 1) * limit;
    const { data } = await instance.get<DBResponseQuery<Order>>(API_URL, {
      params: {
        // backend actual: take/skip + filtros
        take: limit,
        skip,
        search,
        customerEmail,
        customerName,
        customerPhone,
        productId,
        status,
        sortBy,
        sortDir,
      },
    });

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const allMessages = Object.values(error.response.data.errors || {})
          .flat()
          .map((msg) => `- ${msg}`)
          .join(", ");
        const message = allMessages || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }
    } else {
      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}

export async function getOrderById(id: string) {
  try {
    const { data } = await instance.get<Order>(`${API_URL}/${id}`);
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const allMessages = Object.values(error.response.data.errors || {})
          .flat()
          .map((msg) => `- ${msg}`)
          .join(", ");
        const message = allMessages || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }
    } else {
      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}

export async function createOrder(order: OrderFormValues) {
  try {
    const { data } = await instance.post<DBResponseCommand<Order>>(
      API_URL,
      order
    );

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const allMessages = Object.values(error.response.data.errors || {})
          .flat()
          .map((msg) => `- ${msg}`)
          .join(", ");
        const message = allMessages || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }
    } else {
      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}

export async function updateOrder(id: string, order: OrderFormValues) {
  try {
    const { data } = await instance.put<DBResponseCommand<Order>>(
      `${API_URL}/${id}`,
      order
    );
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const allMessages = Object.values(error.response.data.errors || {})
          .flat()
          .map((msg) => `- ${msg}`)
          .join(", ");
        const message = allMessages || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }
    } else {
      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}

export async function deleteOrder(id: string) {
  try {
    const { data } = await instance.delete<DBResponseCommand<Order>>(
      `${API_URL}/${id}`
    );
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const allMessages = Object.values(error.response.data.errors || {})
          .flat()
          .map((msg) => `- ${msg}`)
          .join(", ");
        const message = allMessages || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }
    } else {
      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  }
}
