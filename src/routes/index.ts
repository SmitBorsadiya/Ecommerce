import { Router } from 'express';
import authRoutes from './auth.js';
import productRoutes from './product.js';
import addressRoutes from './address.js';

const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/product', productRoutes);
rootRoutes.use('/address', addressRoutes);

export default rootRoutes;
