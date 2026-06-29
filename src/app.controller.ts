import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { Public } from "@/common/decorators/public.decorator";
import { responseHandler } from "@/common/helpers";

@Controller()
export class AppController {
	@Public()
	@Get("health")
	check(@Res() res: Response) {
		responseHandler(res, {
			statusCode: 200,
			success: true,
			message: "Server is healthy",
			data: {
				status: "ok",
				timestamp: new Date().toISOString(),
				uptime: process.uptime(),
				version: "1.0.0",
			},
		});
	}
}
