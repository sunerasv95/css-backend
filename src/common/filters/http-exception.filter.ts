import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){
        const ctx       = host.switchToHttp();
        const request   = ctx.getRequest<Request>();
        const response  = ctx.getResponse<Response>();
        const status    = exception.getStatus();

        console.log("ressssss", response, status);
        
        response.status(status)
            .json({
                statusCode: status,
                message: response
            });
    };
}