import { Module, Global } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { FirebaseService } from "../firebase/firebase.service";

@Global()
@Module({
	controllers: [NotificationController],
	providers: [NotificationService, FirebaseService],
	exports: [NotificationService],
})
export class NotificationModule {}
