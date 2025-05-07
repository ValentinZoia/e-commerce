import express from 'express';
import cors from 'cors';
import ProductRouter from './routes/product.route';
import CategoryRouter from './routes/categories.route';
// import productRoutes from './routes/productRoutes'

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
 app.use('/api/products', ProductRouter);
 app.use('/api/categories', CategoryRouter);

export default app;