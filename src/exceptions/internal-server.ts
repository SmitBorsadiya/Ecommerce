import { ErrorCode, HttpException } from "./root.js";

export class InternalServerException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 500, null);
    }
}