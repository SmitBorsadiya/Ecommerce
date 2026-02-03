import type { RequestHandler } from "express";
import { UnprocessableEntityException } from "./exceptions/validation.js";
import { ErrorCode, HttpException } from "./exceptions/root.js";
import { InternalException } from "./exceptions/internal-exception.js";

export const errorHandler = (method: RequestHandler): RequestHandler => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        } catch (error: any) {
            console.log(error);
            let exception: HttpException;
            if (error.name === 'ZodError') {
                exception = new UnprocessableEntityException(error, "Validation error", ErrorCode.UNPROCESSABLE_ENTITY);
            } else if (error instanceof HttpException) {
                exception = error;
            } else {
                exception = new InternalException("Internal Server Error", error, ErrorCode.INTERNAL_SERVER_ERROR);
            }
            return next(exception);
        }
    }
}