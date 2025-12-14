import instance from "@/lib/axios";
import { StoreCustomer, DBResponseCommand } from "@/types";
import { StoreCustomerFormValues } from "@/lib/zod-schemas/storeCustomerSchema";
import { handleApiError } from "@/lib/error-handler";
const API_URL = import.meta.env.VITE_API_STORECUSTOMER_URL;

export async function createStoreCustomerData(values: StoreCustomerFormValues) {
    try {
        const { data } = await instance.post<DBResponseCommand<StoreCustomer>>(
            API_URL,
            values,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function updateStoreCustomerData(
    id: string,
    values: StoreCustomerFormValues,
) {
    try {
        const { data } = await instance.put<DBResponseCommand<StoreCustomer>>(
            `${API_URL}/${id}`,
            values,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function deleteStoreCustomerData(id: string) {
    try {
        const { data } = await instance.delete<
            DBResponseCommand<StoreCustomer>
        >(`${API_URL}/${id}`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function getStoreCustomerDataById(id: string) {
    try {
        const { data } = await instance.get<StoreCustomer>(`${API_URL}/${id}`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function getAllStoreCustomerData() {
    try {
        const { data } = await instance.get<StoreCustomer[]>(API_URL);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
