import {
  GetItemParamsBase,
  Category,
  DBResponseQuery,
  DBResponseCommand,
} from "@/types";

import instance from "@/lib/axios";
import { CategoryFormValues } from "@/lib/zod-schemas/categorySchema";
import axios from "axios";
const API_URL = "api/categories";

export async function getCategories(
  params: GetItemParamsBase<Category>
): Promise<DBResponseQuery<Category>> {
  try {
    const { page, limit, search, sortBy, sortDir } = params;
    const skip = (page - 1) * limit;
    const { data } = await instance.get<DBResponseQuery<Category>>(API_URL, {
      params: {
        // backend actual: take/skip + filtros
        take: limit,
        skip,
        search,
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

export async function getCategoryById(id: string) {
  try {
    const { data } = await instance.get<Category>(`${API_URL}/${id}`);
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
export async function getCategoryByName(name: string) {
  try {
    const { data } = await instance.get<Category>(`${API_URL}/name/${name}`);
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

export async function createCategory(category: CategoryFormValues) {
  try {
    const { data } = await instance.post<DBResponseCommand<Category>>(
      API_URL,
      category
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

export async function updateCategory(id: string, category: CategoryFormValues) {
  try {
    const { data } = await instance.put<DBResponseCommand<Category>>(
      `${API_URL}/${id}`,
      category
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

export async function deleteCategory(id: string) {
  try {
    const { data } = await instance.delete<DBResponseCommand<Category>>(
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
