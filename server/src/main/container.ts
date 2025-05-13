import { PrismaCategoryRepository } from '../infrastructure/repositories/PrismaCategoryRepository';
import { PrismaProductRepository } from '../infrastructure/repositories/PrismaProductRepository';
import { CategoryValidator } from '../infrastructure/validators/CategoryValidator';
import { ProductValidator } from '../infrastructure/validators/ProductValidator';
import { CategoryService } from '../application/services/CategoryService';
import { ProductService } from '../application/services/ProductService';
import { CategoryController } from '../presentation/controllers/CategoryController';
import { ProductController } from '../presentation/controllers/ProductController';

export function setupDependencies() {
  // Repositories
  const categoryRepository = new PrismaCategoryRepository();
  const productRepository = new PrismaProductRepository();
  
  // Validators
  const categoryValidator = new CategoryValidator(categoryRepository);
  const productValidator = new ProductValidator(categoryRepository);
  
  // Services
  const categoryService = new CategoryService(categoryRepository, categoryValidator);
  const productService = new ProductService(productRepository, productValidator);
  
  // Controllers
  const categoryController = new CategoryController(categoryService);
  const productController = new ProductController(productService);
  
  return { 
    categoryController, 
    productController 
  };
}