import { AdNetwork } from "@prisma/client";
export interface IAdsProvider {
    network: AdNetwork;
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class AdMobProvider implements IAdsProvider {
    network: "ADMOB";
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class UnityAdsProvider implements IAdsProvider {
    network: "UNITY";
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class IronSourceProvider implements IAdsProvider {
    network: "IRONSOURCE";
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class AppLovinProvider implements IAdsProvider {
    network: "APPLOVIN";
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class HilltopAdsProvider implements IAdsProvider {
    network: "HILLTOPADS";
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class AdsterraProvider implements IAdsProvider {
    network: "ADSTERRA";
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class CustomProvider implements IAdsProvider {
    network: "CUSTOM";
    verifyWatch(token?: string): Promise<boolean>;
}
export declare class AdsProviderFactory {
    private static providers;
    static getProvider(network: AdNetwork): IAdsProvider;
}
