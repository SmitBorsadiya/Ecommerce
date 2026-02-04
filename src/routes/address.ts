import { Router } from "express";
import { createAddress, deleteAddress, listAddress } from "../controllers/userController.js";
import { errorHandler } from '../errorHandler.js';
import authMiddleware from "../middlewares/auth.js";

const addressRoutes: Router = Router();

addressRoutes.post("/", [authMiddleware], errorHandler(createAddress));
addressRoutes.delete("/:id", [authMiddleware], errorHandler(deleteAddress));
addressRoutes.get("/", [authMiddleware], errorHandler(listAddress));

export default addressRoutes;