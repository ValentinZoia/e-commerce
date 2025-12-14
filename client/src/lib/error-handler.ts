import axios from "axios";

type BackendErrorType =
    | "ValidationError"
    | "CustomError"
    | "UniqueConstraintError"
    | "ForeignKeyConstraintError"
    | "NotFoundError"
    | "InconsistentColumnData"
    | "InternalServerError";

export interface AppError {
    type: BackendErrorType | "NetworkError" | "ServerError" | "UnknownError";
    message: string;
    errors?: Record<string, string[]>; //errores de validacion de zod del back
    statusCode?: number;
}

export const handleApiError = (error: unknown): AppError => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const errorBk = error.response.data as AppError;
            if (errorBk.errors) {
                const allMessages = Object.values(errorBk.errors || {})
                    .flat()
                    .map((msg) => `- ${msg}`)
                    .join(", ");
                const message = allMessages || "Error Inesperado del Servidor";

                return { ...errorBk, message };
            }

            return errorBk;
        } else if (error.code === "ECONNABORTED") {
            return {
                type: "NetworkError",
                message: "La conexión demoró demasiado, intentá de nuevo",
                statusCode: 408,
            };
        }
        return {
            statusCode: 0,
            message: "No hay conexión a internet. Verificá tu red",
            type: "NetworkError",
        };
    } else {
        // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
        return {
            statusCode: 500,
            message: "Ocurrió un error inesperado, Intentá de nuevo",
            type: "UnknownError",
        };
    }
};
