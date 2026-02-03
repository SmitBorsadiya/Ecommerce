import type { NextFunction, Request, Response, RequestHandler } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.js";
import { ErrorCode } from "../exceptions/root.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secrets.js";
import { prismaClient } from "../config/prisma.js";

const authMiddleware: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
    const token = authHeader.split(' ')[1]!;
    try {
        const payload = jwt.verify(token, JWT_SECRET) as unknown as { id: number };
        (req as any).user = payload;
        next();
    } catch (error: any) {
        console.log("JWT Verification Error:", error.message);
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
}

export default authMiddleware;