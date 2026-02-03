import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({ 
        message: error.message || "Internal Server Error",
        errorCode: error.errorCode,
        errors: error.errors
    });
}