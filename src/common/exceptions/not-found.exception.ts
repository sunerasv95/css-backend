import { HttpException } from "@nestjs/common";

export class ResourceNotFoundException extends HttpException {
    constructor(statusCode= 400, message = "Resource not found!"){
        super(message, statusCode);
    }
}