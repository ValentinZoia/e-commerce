import { Request, Response } from "express";
import { Category } from "../generated/prisma";
import { handleError } from "./productController";
import { CategoryService } from "../services/categoryService";


// export const createCategory = async (req: Request, res: Response) => {
//     try {
//         const categoryData: Category = req.body;
        
//         if (!categoryData || Object.keys(categoryData).length === 0) {
//              res.status(400).json({
//                 success: false,
//                 message: "Category data is required"
//             });
//         }
        
//         if (!categoryData.name ) {
//              res.status(400).json({
//                 success: false,
//                 message: "Product name and price are required"
//             });
//         }
        
//         const newCategory: Category = await CategoryService.createCategory(categoryData);
        
//         res.status(201).json({
//             success: true,
//             data: newCategory,
//             message: "Category created successfully"
//         });
//     } catch (error) {
//         handleError(res, error, "Error creating category");
//     }
// };

export const createCategory = async (req: Request, res: Response) => {
    try {
      // lógica para crear categoría
      res.status(201).json({ message: "Category created" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        
        
        const categories: Category[] = await CategoryService.getAllCategories()
        
        res.status(200).json({
            success: true,
            data:  categories ,
            message: "Categories retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, `Error fetching categories `);
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        
        if (!categoryId) {
             res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }
        
        const category: Category | null = await CategoryService.getCategoryById(categoryId.toLocaleLowerCase());
        
        if (!category) {
             res.status(404).json({
                success: false,
                message: `Category with ID ${req.params.id} not found`
            });
        }
        
        
        
        res.status(200).json({
            success: true,
            data:  category ,
            message: "Category retrieved successfully"
        });
    } catch (error) {
        handleError(res, error, `Error fetching category with ID ${req.params.categoryId}`);
    }
};