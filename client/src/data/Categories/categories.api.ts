import {
    GetItemParamsBase,
    Category,
    DBResponseQuery,
    DBResponseCommand,
} from "@/types";

import instance from "@/lib/axios";
import { CategoryFormValues } from "@/lib/zod-schemas/categorySchema";
import { handleApiError } from "@/lib/error-handler";
const API_URL = import.meta.env.VITE_API_CATEGORY_URL;

export async function getCategories(
    params: GetItemParamsBase<Category>,
): Promise<DBResponseQuery<Category>> {
    try {
        const { page, limit, search, sortBy, sortDir } = params;
        const skip = (page - 1) * limit;
        const { data } = await instance.get<DBResponseQuery<Category>>(
            API_URL,
            {
                params: {
                    // backend actual: take/skip + filtros
                    take: limit,
                    skip,
                    search,
                    sortBy,
                    sortDir,
                },
            },
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function getCategoryById(id: string) {
    try {
        const { data } = await instance.get<Category>(`${API_URL}/${id}`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
export async function getCategoryByName(name: string) {
    try {
        const { data } = await instance.get<Category>(
            `${API_URL}/name/${name}`,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function createCategory(category: CategoryFormValues) {
    try {
        const { data } = await instance.post<DBResponseCommand<Category>>(
            API_URL,
            category,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function updateCategory(id: string, category: CategoryFormValues) {
    try {
        const { data } = await instance.put<DBResponseCommand<Category>>(
            `${API_URL}/${id}`,
            category,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function deleteCategory(id: string) {
    try {
        const { data } = await instance.delete<DBResponseCommand<Category>>(
            `${API_URL}/${id}`,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
