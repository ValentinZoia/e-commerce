import instance from "@/lib/axios";
import { DBResponseCommand } from "@/types";
import axios from "axios";
const API_URL = "api/ai";
export async function generate(prompt: string) {
  try {
    const { data } = await instance.post<DBResponseCommand<string | null>>(
      API_URL,
      { prompt: prompt }
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
