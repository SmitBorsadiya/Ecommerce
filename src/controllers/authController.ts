import type { NextFunction, Request, Response } from "express";
import { prismaClient } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secrets.js";
import { userSchema, loginSchema } from "../schema/user.js";
import { ErrorCode } from "../exceptions/root.js";
import { BadRequestException } from "../exceptions/bad-request.js";
import { InternalServerException } from "../exceptions/internal-server.js";

/**
 * Register a new user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = userSchema.parse(req.body);

        let user = await prismaClient.user.findUnique({
            where: { email: data.email }
        });
        if (user) {
            return next(new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS));
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        });

        const { password, ...rest } = newUser;

        res.status(200).json({ message: "User registered successfully", user: rest });
    } catch (error) {
        console.log(error);
        return next(new InternalServerException("Internal Server Error", ErrorCode.INTERNAL_SERVER_ERROR));
    }
}

/**
 * Login a user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = loginSchema.parse(req.body);

        let user = await prismaClient.user.findUnique({
            where: { email: data.email }
        });
        if (!user) {
            return next(new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND));
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            return next(new BadRequestException("Invalid password", ErrorCode.INVALID_CREDENTIALS));
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

        const { password, ...rest } = user;

        res.status(200).json({ message: "User logged in successfully", user: rest, token });
    } catch (error) {
        console.log(error);
        return next(new InternalServerException("Internal Server Error", ErrorCode.INTERNAL_SERVER_ERROR));
    }
}