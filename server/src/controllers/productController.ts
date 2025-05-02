import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { Product } from "../generated/prisma";


export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: any;
}


const handleError = (res: Response, error: any, message: string) => {
    console.error(`${message}:`, error);
    
    // Si es un error de Prisma, vamos a tratarlo de manera especial
    const statusCode = error.code === 'P2025' ? 404 : 500;
    const errorMessage = error.code === 'P2025' ? 'Recurso no encontrado' : message;
    
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === 'production' ? undefined : error.toString()
    });
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await ProductService.getAllProducts();
        res.status(200).json({
            success: true,
            data:  products ,
            message: "Products retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, "Error fetching products");
    }
};

export const getNewProducts = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await ProductService.getNewProducts();
        res.status(200).json({
            success: true,
            data:  products ,
            message: "New products retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, "Error fetching new products");
    }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await ProductService.getFeaturedProducts();
        res.status(200).json({
            success: true,
            data:  products ,
            message: "Featured products retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, "Error fetching featured products");
    }
};

export const getPromotionalProducts = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await ProductService.getPromotionProducts();
        res.status(200).json({
            success: true,
            data:  products ,
            message: "Promotional products retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, "Error fetching promotional products");
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        
        if (!productId) {
             res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }
        
        const product: Product | null = await ProductService.getProductById(productId);
        
        if (!product) {
             res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        
        res.status(200).json({
            success: true,
            data:  product ,
            message: "Product retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, `Error fetching product with ID ${req.params.id}`);
    }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }
        
        const products: Product[] = await ProductService.getProductsByCategory(categoryId);
        
        res.status(200).json({
            success: true,
            data:  products ,
            message: "Products by category retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, `Error fetching products for category ${req.params.categoryId}`);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        
        if (!productData || Object.keys(productData).length === 0) {
             res.status(400).json({
                success: false,
                message: "Product data is required"
            });
        }
        
        if (!productData.name || !productData.price) {
             res.status(400).json({
                success: false,
                message: "Product name and price are required"
            });
        }
        
        const newProduct: Product = await ProductService.createProduct(productData);
        
        res.status(201).json({
            success: true,
            data: newProduct ,
            message: "Product created successfully"
        });
    } catch (error) {
        handleError(res, error, "Error creating product");
    }
};