import { Controller, Get, Res } from "@nestjs/common";
import { Public } from "@/common/decorators/public.decorator";

@Controller()
export class AppController {
	@Public()
	@Get("health")
	check() {
		return {
			status: "ok",
			message: "Server is running successfully",
			uptime: process.uptime(),
			version: "1.0.0",
		};
	}
}
