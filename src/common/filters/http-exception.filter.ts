// import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
// import { Request, Response } from "express";

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter{
//     catch(exception: HttpException, host: ArgumentsHost){
//         const ctx       = host.switchToHttp();
//         const request   = ctx.getRequest<Request>();
//         const response  = ctx.getResponse<Response>();
//         const status    = exception.getStatus();

//         console.log("ressssss", response, status);
        
//         response.status(status)
//             .json({
//                 error: status,
//                 message: response
//             });
//     };
// }

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    
    response
      .status(status)
      .json({
        error: false,
        message
      });
  }
}