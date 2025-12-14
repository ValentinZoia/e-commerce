import {
    GetProductsParams,
    Product,
    DBResponseQuery,
    DBResponseCommand,
} from "@/types";
import instance from "@/lib/axios";
import { ProductFormValues } from "@/lib/zod-schemas/productSchema";
import { handleApiError } from "@/lib/error-handler";
const API_URL = import.meta.env.VITE_API_PRODUCT_URL;

export async function getProducts(
    params: GetProductsParams,
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
        throw handleApiError(error);
    }
}

export async function getProductById(id: string) {
    try {
        const { data } = await instance.get<Product>(`${API_URL}/${id}`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
export async function getProductByName(name: string) {
    try {
        const { data } = await instance.get<Product>(`${API_URL}/name/${name}`);
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function createProduct(product: ProductFormValues) {
    try {
        const { data } = await instance.post<DBResponseCommand<Product>>(
            API_URL,
            product,
        );

        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function updateProduct(id: string, product: ProductFormValues) {
    try {
        const { data } = await instance.put<DBResponseCommand<Product>>(
            `${API_URL}/${id}`,
            product,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export async function deleteProduct(id: string) {
    try {
        const { data } = await instance.delete<DBResponseCommand<Product>>(
            `${API_URL}/${id}`,
        );
        return data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}
