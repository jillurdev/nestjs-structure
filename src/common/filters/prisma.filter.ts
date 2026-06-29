import { HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AppMessages } from "@/common/AppMessages/app.messages";

export interface PrismaErrorResponse {
	status: number;
	message: string;
}

export class PrismaFilter {
	static handle(
		error: Prisma.PrismaClientKnownRequestError,
	): PrismaErrorResponse {
		switch (error.code) {
			case "P2000":
				return {
					status: HttpStatus.BAD_REQUEST,
					message: "One or more values are too long.",
				};

			case "P2001":
			case "P2025":
				return {
					status: HttpStatus.NOT_FOUND,
					message: AppMessages.general.notFound,
				};

			case "P2002": {
				const target = error.meta?.target;

				const field = Array.isArray(target)
					? target[0]
					: typeof target === "string"
						? target
						: "";

				switch (field) {
					case "email":
						return {
							status: HttpStatus.CONFLICT,
							message: AppMessages.user.emailExists,
						};

					case "phone":
						return {
							status: HttpStatus.CONFLICT,
							message: AppMessages.user.phoneExists,
						};

					case "handle":
						return {
							status: HttpStatus.CONFLICT,
							message: AppMessages.user.handleExists,
						};

					case "virtualAccountNumber":
						return {
							status: HttpStatus.CONFLICT,
							message: "Virtual account number already exists.",
						};

					default:
						return {
							status: HttpStatus.CONFLICT,
							message: "Duplicate record already exists.",
						};
				}
			}

			case "P2003":
				return {
					status: HttpStatus.BAD_REQUEST,
					message: "Related resource not found.",
				};

			case "P2014":
				return {
					status: HttpStatus.CONFLICT,
					message: "Database relation constraint failed.",
				};

			case "P2024":
				return {
					status: HttpStatus.SERVICE_UNAVAILABLE,
					message: "Database connection timeout.",
				};

			case "P2034":
				return {
					status: HttpStatus.CONFLICT,
					message: "Database transaction failed. Please try again.",
				};

			default:
				return {
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					message: AppMessages.general.serverError,
				};
		}
	}
}
