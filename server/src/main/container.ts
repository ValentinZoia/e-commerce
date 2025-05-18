import { PrismaCategoryRepository } from '../infrastructure/repositories/PrismaCategoryRepository';
import { PrismaProductRepository } from '../infrastructure/repositories/PrismaProductRepository';
import { CategoryValidator } from '../infrastructure/validators/CategoryValidator';
import { ProductValidator } from '../infrastructure/validators/ProductValidator';
import { CategoryService } from '../application/services/CategoryService';
import { ProductService } from '../application/services/ProductService';
import { CategoryController } from '../presentation/controllers/CategoryController';
import { ProductController } from '../presentation/controllers/ProductController';
import { PrismaAdminRepository } from '../infrastructure/repositories/PrismaAdminRepository';
import { AdminValidator } from '../infrastructure/validators/AdminValidator';
import { AdminService } from '../application/services/AdminService';
import { AdminController } from '../presentation/controllers/AdminController';
import { AuthMiddleware } from '../presentation/middlewares/authMiddleware';
const JWT_SECRET=process.env.JWT_SECRET as string
export function setupDependencies() {
  // Repositories
  const categoryRepository = new PrismaCategoryRepository();
  const productRepository = new PrismaProductRepository();
  const adminRepository = new PrismaAdminRepository();
  
  // Validators
  const categoryValidator = new CategoryValidator(categoryRepository);
  const productValidator = new ProductValidator(categoryRepository);
  const adminValidator = new AdminValidator();
  
  // Services
  const categoryService = new CategoryService(categoryRepository, categoryValidator);
  
  const productService = new ProductService(productRepository, productValidator);

  const adminService = new AdminService(adminRepository, adminValidator, JWT_SECRET )
  
  // Controllers
  const categoryController = new CategoryController(categoryService);
  const productController = new ProductController(productService);
  const adminController = new AdminController(adminService);

  //middleware
  const authMiddleware = new AuthMiddleware(adminService)
  
  return { 
    categoryController, 
    productController,
    adminController ,
    authMiddleware
  };
}