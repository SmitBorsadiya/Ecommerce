import { ErrorCode, HttpException } from "./root.js";

export class InternalException extends HttpException {
    constructor(message: string, error: any, errorCode: number) {
        super(message, errorCode, 500, error);
    }
}