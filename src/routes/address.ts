import { Router } from "express";
import { createAddress, deleteAddress, listAddress, updateUser } from "../controllers/userController.js";
import { errorHandler } from '../errorHandler.js';
import authMiddleware from "../middlewares/auth.js";

const addressRoutes: Router = Router();

addressRoutes.post("/", [authMiddleware], errorHandler(createAddress));
addressRoutes.delete("/:id", [authMiddleware], errorHandler(deleteAddress));
addressRoutes.get("/", [authMiddleware], errorHandler(listAddress));
addressRoutes.put("/:id", [authMiddleware], errorHandler(updateUser));

export default addressRoutes;