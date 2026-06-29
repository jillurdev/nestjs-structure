import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { AppMessages } from "@/common/AppMessages/app.messages";
import { PrismaFilter } from "./prisma.filter";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		const ip =
			(request.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
			request.socket.remoteAddress ??
			request.ip;

		if (exception instanceof Error) {
			this.logger.error({
				method: request.method,
				url: request.originalUrl,
				ip,
				message: exception.message,
				stack: exception.stack,
			});
		} else {
			this.logger.error({
				method: request.method,
				url: request.originalUrl,
				ip: request.ip,
				message: String(exception),
			});
		}

		// Log every exception
		if (exception instanceof Error) {
			this.logger.error(exception.message, exception.stack);
		} else {
			this.logger.error(JSON.stringify(exception));
		}

		// Prisma
		if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			return this.handlePrismaException(exception, response);
		}

		// Nest HttpException
		if (exception instanceof HttpException) {
			return this.handleHttpException(exception, response);
		}

		// Unknown
		return this.handleUnknownException(response);
	}

	// ----------------------------------------------------
	// Http Exceptions
	// ----------------------------------------------------

	private handleHttpException(exception: HttpException, response: Response) {
		const status = exception.getStatus();
		const body = exception.getResponse();

		// ValidationPipe
		if (
			exception instanceof BadRequestException &&
			typeof body !== "string" &&
			Array.isArray((body as any).message)
		) {
			return response.status(status).json({
				statusCode: status,
				success: false,
				message: (body as any).message[0],
				errors: (body as any).message,
				data: null,
			});
		}

		let message = "Something went wrong";

		if (typeof body === "string") {
			message = body;
		} else if (typeof body === "object" && body !== null) {
			message = (body as any).message ?? AppMessages.general.serverError;
		}

		return response.status(status).json(this.buildResponse(status, message));
	}

	// ----------------------------------------------------
	// Shared Response Builder
	// ----------------------------------------------------

	private buildResponse(status: number, message: string) {
		return {
			statusCode: status,
			success: false,
			timestamp: new Date().toISOString(),
			message,
			data: null,
		};
	}
	// ----------------------------------------------------
	// Prisma Exceptions
	// ----------------------------------------------------

	private handlePrismaException(
		exception: Prisma.PrismaClientKnownRequestError,
		response: Response,
	) {
		const { status, message } = PrismaFilter.handle(exception);

		return response.status(status).json(this.buildResponse(status, message));
	}

	// ----------------------------------------------------
	// Unknown Exceptions
	// ----------------------------------------------------

	private handleUnknownException(response: Response) {
		return response
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json(
				this.buildResponse(
					HttpStatus.INTERNAL_SERVER_ERROR,
					AppMessages.general.serverError,
				),
			);
	}
}
