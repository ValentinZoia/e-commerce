import instance from "@/lib/axios";
import { handleApiError } from "@/lib/error-handler";
import { LoginFormValues } from "@/lib/zod-schemas/loginSchema";
import { User } from "@/types";
import { DBResponseCommand } from "@/types/shared";
const API_URL = import.meta.env.VITE_API_ADMIN_URL;

export async function login(credentials: LoginFormValues) {
    try {
        const { data } = await instance.post<DBResponseCommand<User>>(
            `${API_URL}/login`,
            credentials,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
export async function logout() {
    try {
        const { data } = await instance.post<DBResponseCommand<User>>(
            `${API_URL}/logout`,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function createAdmin(credentials: LoginFormValues) {
    try {
        const { data } = await instance.post<DBResponseCommand<User>>(
            `${API_URL}`,
            credentials,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function deleteAdmin(username: string) {
    try {
        const { data } = await instance.delete<DBResponseCommand<User>>(
            `${API_URL}/${username}`,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

interface verifySessionResponse {
    user: User;
}

export async function verifySession() {
    try {
        const { data } = await instance.get<verifySessionResponse>(
            `${API_URL}`,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
