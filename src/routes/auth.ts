import { Router } from 'express';
import { login, signup, me } from '../controllers/authController.js';
import { errorHandler } from '../errorHandler.js';
import authMiddleware from '../middlewares/auth.js';

const authRoutes: Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup', errorHandler(signup));
authRoutes.get('/me', authMiddleware, errorHandler(me));

export default authRoutes;