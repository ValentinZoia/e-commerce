import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/Interfaces/IProductRepository";
import { IValidator } from "../../domain/Interfaces/IValidator";
import { ValidationError } from "../../infrastructure/validators/ValidationError";

export class ProductService {
  constructor(
    private productRepository: IProductRepository,
    private productValidator: IValidator<Product>
  ) {}

  async createProduct(productData: unknown): Promise<Product> {
    //Validar datos
    const validatedProduct = await this.productValidator.validate(productData);

    //verificar si el nombre ya existe
    const existingProduct = await this.productRepository.getByName(
      validatedProduct.name
    );
    if (existingProduct) {
      const error: Record<string, string[]> = {
        name: ["Ya existe un producto con ese nombre"],
      };

      throw new ValidationError(error);
    }

    // crear producto
    return this.productRepository.create(validatedProduct);
  }

  async updateProduct(id: string, productData: unknown): Promise<Product> {
    // Verificar primero que existe el producto a actualizar
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct) {
      throw new Error("Producto a actualizar no encontrado");
    }

    //Validar datos
    const validatedProduct = await this.productValidator.validate(
      productData
      
    );

    //verificar si el nombre ya existe en otro producto
    const productWithSameName = await this.productRepository.getByName(
      validatedProduct.name
    );
    if (productWithSameName && existingProduct.id !== productWithSameName.id) {
      const error: Record<string, string[]> = {
        name: ["Ya existe un producto con ese nombre"],
      };

      throw new ValidationError(error);
    }

    //Actualizar producto
    return this.productRepository.update(id, validatedProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    // Verificar primero que existe el producto a eliminar
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct) {
      throw new Error("Producto a eliminar no encontrado");
    }

    return this.productRepository.delete(id);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.getById(id);
    if(!product){
        throw new Error('Producto no encontrado');
    }
    return product
  }

  async getAllProducts(options?: {
    category?: string;
    featured?: boolean;
    promotion?: boolean;
    new?: boolean;
    take?:number
    skip?:number
    
  }): Promise<Product[]> {
    
    

    
     const products = await this.productRepository.getAll({
        category: options?.category,
        featured: options?.featured,
        promotion: options?.promotion,
        new: options?.new,
        take: options?.take,
        skip: options?.skip
      });

      if(!products){
        throw new Error("No se encontraron Productos")
      }
      
    

    

    return  products;
  }


  async getProductByName(name:string):Promise<Product>{
    const product = await this.productRepository.getByName(name);
    if(!product){
        throw new Error("No se encontro un producto con ese nombre")
    }

    return product;
  }
}
