import instance from "@/lib/axios";
import { handleApiError } from "@/lib/error-handler";
import { DBResponseCommand } from "@/types";
import { CheckoutDataResponse, CheckoutSession } from "@/types/checkout";
const API_URL = import.meta.env.VITE_API_CHECKOUT_URL;

export async function createCheckoutSession(userId: string) {
    try {
        const { data } = await instance.post<
            DBResponseCommand<CheckoutDataResponse>
        >(API_URL, { userId: userId });
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function getCheckoutSession(token: string) {
    try {
        const { data } = await instance.get<DBResponseCommand<CheckoutSession>>(
            `${API_URL}/${token}`,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function extendCheckoutSession(token: string) {
    try {
        const { data } = await instance.put<
            DBResponseCommand<CheckoutDataResponse>
        >(`${API_URL}/${token}/extend`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function deleteCheckoutSession(token: string) {
    try {
        const { data } = await instance.delete<
            DBResponseCommand<CheckoutSession>
        >(`${API_URL}/${token}`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
