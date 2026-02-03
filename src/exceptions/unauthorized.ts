import { ErrorCode, HttpException } from "./root.js";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, error?: any) {
        super(message, errorCode, 401, null);
    }
}