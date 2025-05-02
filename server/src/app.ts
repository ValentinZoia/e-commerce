import express from 'express';
import cors from 'cors';
import ProductRouter from './routes/product.route';
// import productRoutes from './routes/productRoutes'

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
 app.use('/api/products', ProductRouter);

export default app;