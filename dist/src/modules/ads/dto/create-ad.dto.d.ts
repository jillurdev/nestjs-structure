import { AdNetwork, AdType } from "@prisma/client";
export declare class CreateAdDto {
    title: string;
    description?: string;
    adNetwork: AdNetwork;
    adType: AdType;
    adUnitId?: string;
    rewardAmount: number;
    durationSeconds?: number;
    targetBasic?: boolean;
    targetPremium?: boolean;
    priority?: number;
}
