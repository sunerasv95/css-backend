import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter<Error> {
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		let message = (exception as any).message;
		let code = "HttpException";
		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		//const status = exception.getStatus();

		// Logger.error(
		// 	"huuuu " + message,
		// 	(exception as any).stack,
		// 	`${request.method} ${request.url}`
		// );

		// response
		// .status(500)
		// .json({
		// 	statusCode: 500,
		// 	message: "huuu"//exception.message
		// });

		switch (exception.constructor) {
			case HttpException:
				status = (exception as HttpException).getStatus();
				break;
			case QueryFailedError:
				status = HttpStatus.UNPROCESSABLE_ENTITY;
				message = (exception as QueryFailedError).message;
				code = (exception as any).code;
			default:
				status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		console.log("ff",{
				status,
				message,
				code,
				request,
			} );
		

		// response.json({
		// 	status,
		// 	message,
		// 	code,
		// 	request,
		// });

		// return JSON.stringify({
		// 	status,
		// 	message,
		// 	code,
		// 	request
		// });
		return JSON.stringify(message);
	}
}
