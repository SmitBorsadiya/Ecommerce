import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { errorHandler } from '../errorHandler.js';
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

const productRoutes: Router = Router();

productRoutes.get("/", errorHandler(getAllProducts));
productRoutes.get("/:id", errorHandler(getProductById));
productRoutes.post("/", [authMiddleware, adminMiddleware], errorHandler(createProduct));
productRoutes.put("/:id", [authMiddleware, adminMiddleware], errorHandler(updateProduct));
productRoutes.delete("/:id", [authMiddleware, adminMiddleware], errorHandler(deleteProduct));

export default productRoutes;