import { configs } from "@/config";
import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

@Injectable()
export class FirebaseService implements OnModuleInit {
	private readonly logger = new Logger(FirebaseService.name);

	onModuleInit() {
		if (!getApps().length) {
			initializeApp({
				credential: cert({
					projectId: configs.firebase.projectId,
					clientEmail: configs.firebase.clientEmail,
					privateKey: configs.firebase.privateKey?.replace(/\\n/g, "\n"),
				}),
			});
			this.logger.log("✅ Firebase Admin initialized");
		}
	}
	async sendToToken(
		fcmToken: string,
		title: string,
		body: string,
		data?: Record<string, string>,
	): Promise<boolean> {
		try {
			await getMessaging().send({
				token: fcmToken,
				// ❌ notification block সরাও
				data: {
					title, // ✅ data তে পাঠাও
					body,
					...(data ?? {}),
				},
				android: {
					priority: "high",
				},
			});
			return true;
		} catch (error) {
			this.logger.error(`FCM send failed: ${error}`);
			return false;
		}
	}

	async sendToMany(
		fcmTokens: string[],
		title: string,
		body: string,
		data?: Record<string, string>,
	): Promise<number> {
		if (fcmTokens.length === 0) return 0;

		const messages = fcmTokens.map(token => ({
			token,
			// ❌ notification block সরাও
			data: {
				title,
				body,
				...(data ?? {}),
			},
			android: {
				priority: "high" as const,
			},
		}));

		const response = await getMessaging().sendEach(messages);
		return response.successCount;
	}
	// async sendToToken(
	// 	fcmToken: string,
	// 	title: string,
	// 	body: string,
	// 	data?: Record<string, string>,
	// ): Promise<boolean> {
	// 	try {
	// 		await getMessaging().send({
	// 			token: fcmToken,
	// 			notification: { title, body },
	// 			data: data ?? {},
	// 			android: {
	// 				priority: "high",
	// 				notification: { sound: "default" },
	// 			},
	// 		});
	// 		return true;
	// 	} catch (error) {
	// 		this.logger.error(`FCM send failed: ${error}`);
	// 		return false;
	// 	}
	// }

	// async sendToMany(
	// 	fcmTokens: string[],
	// 	title: string,
	// 	body: string,
	// 	data?: Record<string, string>,
	// ): Promise<number> {
	// 	if (fcmTokens.length === 0) return 0;

	// 	const messages = fcmTokens.map(token => ({
	// 		token,
	// 		notification: { title, body },
	// 		data: data ?? {},
	// 		android: {
	// 			priority: "high" as const,
	// 			notification: { sound: "default" },
	// 		},
	// 	}));

	// 	const response = await getMessaging().sendEach(messages);
	// 	return response.successCount;
	// }
}
