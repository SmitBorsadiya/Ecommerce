import { Router } from "express";
import { errorHandler } from "../errorHandler.js";
import authMiddleware from "../middlewares/auth.js";
import { changeRole, getUser, listUser } from "../controllers/userController.js";

const userRoutes: Router = Router();

userRoutes.get("/", [authMiddleware], errorHandler(listUser));
userRoutes.get("/:id", [authMiddleware], errorHandler(getUser));
userRoutes.put("/:id/role", [authMiddleware], errorHandler(changeRole));

export default userRoutes;
