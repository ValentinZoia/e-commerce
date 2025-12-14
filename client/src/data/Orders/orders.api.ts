import { DBResponseQuery, DBResponseCommand } from "@/types";
import instance from "@/lib/axios";
import { GetOrdersParams, Order } from "@/types/order";
import { OrderFormValues } from "@/lib/zod-schemas/orderSchema";
import { handleApiError } from "@/lib/error-handler";
const API_URL = import.meta.env.VITE_API_ORDER_URL;

export async function getOrders(
    params: GetOrdersParams,
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
        throw handleApiError(error);
    }
}

export async function getOrderById(id: string) {
    try {
        const { data } = await instance.get<Order>(`${API_URL}/${id}`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function createOrder(order: OrderFormValues) {
    try {
        const { data } = await instance.post<DBResponseCommand<Order>>(
            API_URL,
            order,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function updateOrder(id: string, order: OrderFormValues) {
    try {
        const { data } = await instance.put<DBResponseCommand<Order>>(
            `${API_URL}/${id}`,
            order,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function deleteOrder(id: string) {
    try {
        const { data } = await instance.delete<DBResponseCommand<Order>>(
            `${API_URL}/${id}`,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
