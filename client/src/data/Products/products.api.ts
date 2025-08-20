import {
  GetProductsParams,
  Product,
  DBResponseQuery,
  DBResponseCommand,
} from "@/types";
import instance from "@/lib/axios";
import { ProductFormValues } from "@/lib/zod-schemas/productSchema";
import axios from "axios";
const API_URL = "api/products";

export async function getProducts(
  params: GetProductsParams
): Promise<DBResponseQuery<Product>> {
  try {
    const {
      page,
      limit,
      search,
      category,
      featured,
      promotion,
      new: isNew,
      priceMax,
      priceMin,
      inStock,
      freeShipping,
      size,
      sortBy,
      sortDir,
    } = params;
    const skip = (page - 1) * limit;

    const { data } = await instance.get<DBResponseQuery<Product>>(API_URL, {
      params: {
        // backend actual: take/skip + filtros
        take: limit,
        skip,
        search,
        category,
        featured,
        promotion,
        new: isNew,
        priceMax,
        priceMin,
        inStock,
        freeShipping,
        size,
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

export async function getProductById(id: string) {
  try {
    const { data } = await instance.get<Product>(`${API_URL}/${id}`);
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
export async function getProductByName(name: string) {
  try {
    const { data } = await instance.get<Product>(`${API_URL}/name/${name}`);
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

export async function createProduct(product: ProductFormValues) {
  try {
    const { data } = await instance.post<DBResponseCommand<Product>>(
      API_URL,
      product
    );
    console.log(data);
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

export async function updateProduct(id: string, product: ProductFormValues) {
  try {
    const { data } = await instance.put<DBResponseCommand<Product>>(
      `${API_URL}/${id}`,
      product
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

export async function deleteProduct(id: string) {
  try {
    const { data } = await instance.delete<DBResponseCommand<Product>>(
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
