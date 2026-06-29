import { PrismaService } from "@/database/prisma/prisma.service";
import { NotificationService } from "../notification/notification.service";
export declare class ReferralService {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    applyReferral(referredUserId: string, referralCodeInput: string): Promise<void>;
}
