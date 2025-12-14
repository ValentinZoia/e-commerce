import instance from "@/lib/axios";
import { handleApiError } from "@/lib/error-handler";
import { DBResponseCommand } from "@/types";

const API_URL = import.meta.env.VITE_API_AI_URL;

export async function generate(prompt: string) {
    try {
        const { data } = await instance.post<DBResponseCommand<string | null>>(
            API_URL,
            { prompt: prompt },
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
