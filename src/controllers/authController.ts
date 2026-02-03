import type { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secrets.js";
import { signupSchema, loginSchema } from "../schema/user.js";
import { ErrorCode } from "../exceptions/root.js";
import { BadRequestException } from "../exceptions/bad-request.js";
import { NotFoundException } from "../exceptions/not-found.js";

/**
 * Register a new user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
export const signup: RequestHandler = async (req, res, next) => {
    const data = signupSchema.parse(req.body);

    const user = await prismaClient.user.findUnique({
        where: { email: data.email }
    });
    if (user) {
        throw new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS);
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
}

/**
 * Login a user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
export const login: RequestHandler = async (req, res, next) => {
    const data = loginSchema.parse(req.body);

    let user = await prismaClient.user.findUnique({
        where: { email: data.email }
    });
    if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new BadRequestException("Invalid password", ErrorCode.INVALID_CREDENTIALS);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    const { password, ...rest } = user;

    res.status(200).json({ message: "User logged in successfully", user: rest, token });
}

/**
 * Get current user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
export const me: RequestHandler = async (req, res) => {
    const user = await prismaClient.user.findUnique({
        where: { id: (req as any).user.id }
    });
    if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    const { password, ...rest } = user;
    return res.status(200).json({ message: "User fetched successfully", user: rest });
}
