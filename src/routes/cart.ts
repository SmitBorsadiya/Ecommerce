import { Router } from "express";
import { errorHandler } from "../errorHandler.js";
import { addItemToCart, changeItemQuantity, deleteCartItem, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";

const cartRoutes: Router = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteCartItem));
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeItemQuantity));

export default cartRoutes;
