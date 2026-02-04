import type { RequestHandler } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.js";
import { ErrorCode } from "../exceptions/root.js";

const adminMiddleware: RequestHandler = async (req, res, next) => {
    const user = (req as any).user;
    if (user.role == "ADMIN") {
        return next();
    }
    return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
}

export default adminMiddleware;