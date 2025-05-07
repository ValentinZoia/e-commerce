
import prisma from "../config/prisma";

import {  Product, Category } from "../generated/prisma";





export const CategoryService = {
    

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
    async getProductsByCategoryV2(categoryId: string) {
        try {
            if (!categoryId) {
                throw new Error("Category ID is required");
            }

            const category = await prisma.category.findMany({
                where:{name:categoryId},
                select:{products:true}
            });
            
            return category;
        } catch (error) {
            console.error("Error in getProductsByCategoryV2 service:", error);
            throw error;
        }
    },

    async getAllCategories(): Promise<Category[]> {
        try {
            const categories = await prisma.category.findMany({});
            return categories;
        } catch (error) {
            console.error("Error in getCategories service:", error);
            throw error;
        }
    },
    async getCategoryById(id: string): Promise<Category | null> {
        try {
            if (!id) {
                throw new Error("Category ID is required");
            }
            
            const category = await prisma.category.findUnique({
                where: { name: id },
            });
            
            return category;
        } catch (error) {
            console.error(`Error in getCategoryById service for ID ${id}:`, error);
            throw error;
        }
    },

    
    async createCategory(category: Omit<Category, "id">): Promise<Category> {
        try {
            if (!category) {
                throw new Error("Category data is required");
            }
            
            // Validación básica de datos
            if (!category.name) {
                throw new Error("Category name is required");
            }
            
            const newCategory = await prisma.category.create({ 
                data: category 
            });
            
            return newCategory;
        } catch (error) {
            console.error("Error in createCategory service:", error);
            throw error;
        }
    }
};


