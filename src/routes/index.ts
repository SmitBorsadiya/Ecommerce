import { Router } from 'express';
import authRoutes from './auth.js';
import productRoutes from './product.js';

const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/product', productRoutes);

export default rootRoutes;
