import { Router } from 'express';
import authRoutes from './auth.js';
import productRoutes from './product.js';
import addressRoutes from './address.js';
import cartRoutes from './cart.js';
import orderRoutes from './order.js';
import userRoutes from './user.js';

const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/product', productRoutes);
rootRoutes.use('/address', addressRoutes);
rootRoutes.use('/cart', cartRoutes);
rootRoutes.use('/order', orderRoutes);
rootRoutes.use('/user', userRoutes);

export default rootRoutes;
