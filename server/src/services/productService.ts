import prisma from "../config/prisma";

import {  Product } from "../generated/prisma";




export const ProductService = {
    async getAllProducts(): Promise<Product[]> {
        try {
            const products = await prisma.product.findMany({});
            return products;
        } catch (error) {
            console.error("Error in getAllProducts service:", error);
            throw error;
        }
    },

    async getProductById(id: string): Promise<Product | null> {
        try {
            if (!id) {
                throw new Error("Product ID is required");
            }
            
            const product = await prisma.product.findUnique({
                where: { id },
            });
            
            return product;
        } catch (error) {
            console.error(`Error in getProductById service for ID ${id}:`, error);
            throw error;
        }
    },

    async getNewProducts(): Promise<Product[]> {
        try {
            const products = await prisma.product.findMany({
                where: { isNew: true },
            });
            
            return products;
        } catch (error) {
            console.error("Error in getNewProducts service:", error);
            throw error;
        }
    },

    async getProductsByCategory(categoryId: string): Promise<Product[]> {
        try {
            if (!categoryId) {
                throw new Error("Category ID is required");
            }
            
            const products = await prisma.product.findMany({
                where: { categoryId },
            });
            
            return products;
        } catch (error) {
            console.error(`Error in getProductsByCategory service for category ${categoryId}:`, error);
            throw error;
        }
    },

    async getFeaturedProducts(): Promise<Product[]> {
        try {
            const products = await prisma.product.findMany({
                where: { isFeatured: true },
            });
            
            return products;
        } catch (error) {
            console.error("Error in getFeaturedProducts service:", error);
            throw error;
        }
    },

    async getPromotionProducts(): Promise<Product[]> {
        try {
            const products = await prisma.product.findMany({
                where: { isPromotion: true },
            });
            
            return products;
        } catch (error) {
            console.error("Error in getPromotionProducts service:", error);
            throw error;
        }
    },

    async createProduct(product: Omit<Product, "id">): Promise<Product> {
        try {
            if (!product) {
                throw new Error("Product data is required");
            }
            
            // Validación básica de datos
            if (!product.name || !product.price) {
                throw new Error("Product name and price are required");
            }
            
            const newProduct = await prisma.product.create({ 
                data: product 
            });
            
            return newProduct;
        } catch (error) {
            console.error("Error in createProduct service:", error);
            throw error;
        }
    },
};


