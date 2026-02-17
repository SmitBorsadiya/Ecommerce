import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { errorHandler } from "../errorHandler.js";
import { createOrder, listOrder, cancelOrder, getOrder, listAllOrders, listUserOrders, changeStatus } from "../controllers/orderController.js";
import adminMiddleware from "../middlewares/admin.js";

const orderRouter: Router = Router();

orderRouter.post("/", [authMiddleware], errorHandler(createOrder));
orderRouter.get("/", [authMiddleware], errorHandler(listOrder));
orderRouter.get("/cancel/:id", [authMiddleware], errorHandler(cancelOrder));
orderRouter.get("/index", [authMiddleware, adminMiddleware], errorHandler(listAllOrders));
orderRouter.get("/users/:id", [authMiddleware, adminMiddleware], errorHandler(listUserOrders));
orderRouter.get("/:id", [authMiddleware], errorHandler(getOrder));
orderRouter.put("/:id/status", [authMiddleware, adminMiddleware], errorHandler(changeStatus));

export default orderRouter;