"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
const config_1 = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api/v1");
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = config_1.configs.app.allowedOrigins;
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    });
    if (!config_1.configs.app.isProduction) {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle("Vyyve Bank API")
            .setDescription("API documentation for Vyyve Bank")
            .setVersion("1.0.0")
            .addBearerAuth()
            .addCookieAuth("accessToken")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup("api/docs", app, document);
    }
    await app.listen(config_1.configs.app.port);
    const logger = new common_1.Logger("Bootstrap");
    const host = await app.getUrl();
    logger.log(`🚀 Server running on ${host}`);
    logger.log(`🌍 Environment: ${config_1.configs.app.env}`);
    logger.log(`📦 API Base: ${host}/api/v1`);
    if (!config_1.configs.app.isProduction) {
        logger.log(`📄 Swagger: ${host}/api/docs`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map