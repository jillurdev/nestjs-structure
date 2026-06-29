import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { configs } from "./config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api/v1");

	app.use(cookieParser());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			stopAtFirstError: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	app.enableCors({
		origin: (origin, callback) => {
			const allowedOrigins = configs.app.allowedOrigins;

			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}

			callback(new Error("Not allowed by CORS"));
		},
		credentials: true,
	});

	// Swagger
	if (!configs.app.isProduction) {
		const swaggerConfig = new DocumentBuilder()
			.setTitle("Vyyve Bank API")
			.setDescription("API documentation for Vyyve Bank")
			.setVersion("1.0.0")
			.addBearerAuth()
			.addCookieAuth("accessToken")
			.build();

		const document = SwaggerModule.createDocument(app, swaggerConfig);

		SwaggerModule.setup("api/docs", app, document);
	}

	await app.listen(configs.app.port);

	const logger = new Logger("Bootstrap");

	const host = await app.getUrl();

	logger.log(`🚀 Server running on ${host}`);
	logger.log(`🌍 Environment: ${configs.app.env}`);
	logger.log(`📦 API Base: ${host}/api/v1`);

	if (!configs.app.isProduction) {
		logger.log(`📄 Swagger: ${host}/api/docs`);
	}
}

bootstrap();
