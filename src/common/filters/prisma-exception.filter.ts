import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(PrismaExceptionFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		this.logger.error(exception);

		if (exception instanceof HttpException) {
			const status = exception.getStatus();
			const res = exception.getResponse() as any;
			return response.status(status).json({
				statusCode: status,
				success: false,
				message:
					typeof res === "string" ? res : res.message || "Something went wrong",
				data: null,
			});
		}

		const prismaError = exception as any;
		if (prismaError?.code?.startsWith("P")) {
			const { status, message } = this.handlePrismaError(prismaError);
			return response.status(status).json({
				statusCode: status,
				success: false,
				message,
				data: null,
			});
		}

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			success: false,
			message: "Internal server error",
			data: null,
		});
	}

	private handlePrismaError(exception: any): {
		status: number;
		message: string;
	} {
		switch (exception.code) {
			case "P2002": {
				const fields =
					exception.meta?.target ||
					exception.meta?.constraint?.fields ||
					exception.meta?.driverAdapterError?.cause?.constraint?.fields ||
					[];
				const fieldNames = Array.isArray(fields) ? fields.join(", ") : fields;
				return {
					status: HttpStatus.CONFLICT,
					message: `A record with this ${fieldNames} already exists`,
				};
			}
			case "P2025":
				return {
					status: HttpStatus.NOT_FOUND,
					message: exception.meta?.cause ?? "Record not found",
				};
			case "P2003":
				return {
					status: HttpStatus.BAD_REQUEST,
					message: `Related record not found for ${exception.meta?.field_name}`,
				};
			default:
				return {
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					message: "A database error occurred",
				};
		}
	}
}
