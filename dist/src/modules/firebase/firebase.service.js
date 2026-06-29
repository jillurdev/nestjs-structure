"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FirebaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const config_1 = require("../../config");
const common_1 = require("@nestjs/common");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
let FirebaseService = FirebaseService_1 = class FirebaseService {
    constructor() {
        this.logger = new common_1.Logger(FirebaseService_1.name);
    }
    onModuleInit() {
        if (!(0, app_1.getApps)().length) {
            (0, app_1.initializeApp)({
                credential: (0, app_1.cert)({
                    projectId: config_1.configs.firebase.projectId,
                    clientEmail: config_1.configs.firebase.clientEmail,
                    privateKey: config_1.configs.firebase.privateKey?.replace(/\\n/g, "\n"),
                }),
            });
            this.logger.log("✅ Firebase Admin initialized");
        }
    }
    async sendToToken(fcmToken, title, body, data) {
        try {
            await (0, messaging_1.getMessaging)().send({
                token: fcmToken,
                data: {
                    title,
                    body,
                    ...(data ?? {}),
                },
                android: {
                    priority: "high",
                },
            });
            return true;
        }
        catch (error) {
            this.logger.error(`FCM send failed: ${error}`);
            return false;
        }
    }
    async sendToMany(fcmTokens, title, body, data) {
        if (fcmTokens.length === 0)
            return 0;
        const messages = fcmTokens.map(token => ({
            token,
            data: {
                title,
                body,
                ...(data ?? {}),
            },
            android: {
                priority: "high",
            },
        }));
        const response = await (0, messaging_1.getMessaging)().sendEach(messages);
        return response.successCount;
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = FirebaseService_1 = __decorate([
    (0, common_1.Injectable)()
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map