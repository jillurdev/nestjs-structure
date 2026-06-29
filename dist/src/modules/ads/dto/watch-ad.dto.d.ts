import { AdNetwork } from "@prisma/client";
export declare class WatchAdDto {
    adId: string;
    adNetwork: AdNetwork;
    deviceId?: string;
    verificationToken?: string;
}
