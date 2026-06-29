import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { PrismaExceptionFilter } from "./common/filters/prisma-exception.filter";
import { runSeed } from "prisma/seed";
import { configs } from "./config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	try {
		await runSeed();
	} catch (e) {
		console.error("❌ Seed error:", e);
	}

	const app = await NestFactory.create(AppModule);

	app.use((req: any, res: any, next: any) => {
		const logger = new Logger("HTTP");
		logger.log(
			`${req.method} ${req.url} — Origin: ${req.headers.origin || "direct"}`,
		);
		next();
	});

	app.use(cookieParser());

	app.setGlobalPrefix("api/v1");

	app.useGlobalFilters(new PrismaExceptionFilter());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.enableCors({
		origin: (origin, callback) => {
			const allowedOrigins = configs.app.allowedOrigins;
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	});

	// ─── Swagger setup ────────────────────────────────────────────
	if (!configs.app.isProduction) {
		const swaggerConfig = new DocumentBuilder()
			.setTitle("TakaNib API")
			.setDescription("API documentation for TakaNibo — earning marketplace")
			.setVersion("1.0")
			.addCookieAuth("token")
			.build();

		const document = SwaggerModule.createDocument(app, swaggerConfig);
		SwaggerModule.setup("api/docs", app, document);
	}

	await app.listen(configs.app.port);
	console.log(`🚀 Server running on http://localhost:${configs.app.port}`);
	console.log(
		`📄 Swagger docs at http://localhost:${configs.app.port}/api/docs`,
	);
}
bootstrap();
