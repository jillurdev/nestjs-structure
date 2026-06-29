"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma_exception_filter_1 = require("./common/filters/prisma-exception.filter");
const seed_1 = require("../prisma/seed");
const config_1 = require("./config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    try {
        await (0, seed_1.runSeed)();
    }
    catch (e) {
        console.error("❌ Seed error:", e);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        const logger = new common_1.Logger("HTTP");
        logger.log(`${req.method} ${req.url} — Origin: ${req.headers.origin || "direct"}`);
        next();
    });
    app.use((0, cookie_parser_1.default)());
    app.setGlobalPrefix("api/v1");
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = config_1.configs.app.allowedOrigins;
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    if (!config_1.configs.app.isProduction) {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle("TakaNib API")
            .setDescription("API documentation for TakaNibo — earning marketplace")
            .setVersion("1.0")
            .addCookieAuth("token")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup("api/docs", app, document);
    }
    await app.listen(config_1.configs.app.port);
    console.log(`🚀 Server running on http://localhost:${config_1.configs.app.port}`);
    console.log(`📄 Swagger docs at http://localhost:${config_1.configs.app.port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map