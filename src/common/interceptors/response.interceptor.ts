import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request, Response } from "express";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const http = context.switchToHttp();

		const request = http.getRequest<Request>();
		const response = http.getResponse<Response>();

		return next.handle().pipe(
			map(body => {
				// If service already returned wrapped response
				if (body?.success !== undefined) {
					return body;
				}

				const requestId =
					request.headers["x-request-id"] ?? crypto.randomUUID();

				return {
					statusCode: response.statusCode || HttpStatus.OK,
					success: true,
					message: body?.message ?? null,
					timestamp: new Date().toISOString(),
					requestId,
					meta: body?.meta,
					data: body?.data !== undefined ? body.data : body,
				};
			}),
		);
	}
}
