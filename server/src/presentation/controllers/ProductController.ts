import { Request, Response, NextFunction } from "express";
import { ProductService } from "../../application/services/ProductService";

export class ProductController {
  constructor(private productService: ProductService) {}

  createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedProduct = await this.productService.updateProduct(
        id,
        req.body
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        category,
        featured,
        promotion,
        new: isNew,
        take,
        skip,
      } = req.query;

      const result = await this.productService.getAllProducts({
        category: category as string,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        new: isNew === 'true' ? true : isNew === 'false' ? false : undefined,
        promotion:promotion === 'true' ? true :promotion === 'false' ? false : undefined,
        take: take ? parseInt(take as string) : undefined,
        skip: skip ? parseInt(skip as string) : undefined
      });

      res.status(200).json(result);

    } catch (error) {
        next(error)
    }
  };

  getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  getProductByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name } = req.params;
      const product = await this.productService.getProductByName(name);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
}
