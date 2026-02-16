import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { errorHandler } from "../errorHandler.js";
import { createOrder, listOrder, cancelOrder, getOrder } from "../controllers/orderController.js";

const orderRouter: Router = Router();

orderRouter.post("/", [authMiddleware], errorHandler(createOrder));
orderRouter.get("/", [authMiddleware], errorHandler(listOrder));
orderRouter.get("/cancel/:id", [authMiddleware], errorHandler(cancelOrder));
orderRouter.get("/:id", [authMiddleware], errorHandler(getOrder));

export default orderRouter;