"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsProviderFactory = exports.CustomProvider = exports.AdsterraProvider = exports.HilltopAdsProvider = exports.AppLovinProvider = exports.IronSourceProvider = exports.UnityAdsProvider = exports.AdMobProvider = void 0;
const app_messages_1 = require("../../../common/AppMessages/app.messages");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
class AdMobProvider {
    constructor() {
        this.network = client_1.AdNetwork.ADMOB;
    }
    async verifyWatch(token) {
        return true;
    }
}
exports.AdMobProvider = AdMobProvider;
class UnityAdsProvider {
    constructor() {
        this.network = client_1.AdNetwork.UNITY;
    }
    async verifyWatch(token) {
        return true;
    }
}
exports.UnityAdsProvider = UnityAdsProvider;
class IronSourceProvider {
    constructor() {
        this.network = client_1.AdNetwork.IRONSOURCE;
    }
    async verifyWatch(token) {
        return true;
    }
}
exports.IronSourceProvider = IronSourceProvider;
class AppLovinProvider {
    constructor() {
        this.network = client_1.AdNetwork.APPLOVIN;
    }
    async verifyWatch(token) {
        return true;
    }
}
exports.AppLovinProvider = AppLovinProvider;
class HilltopAdsProvider {
    constructor() {
        this.network = client_1.AdNetwork.HILLTOPADS;
    }
    async verifyWatch(token) {
        return true;
    }
}
exports.HilltopAdsProvider = HilltopAdsProvider;
class AdsterraProvider {
    constructor() {
        this.network = client_1.AdNetwork.ADSTERRA;
    }
    async verifyWatch(token) {
        return true;
    }
}
exports.AdsterraProvider = AdsterraProvider;
class CustomProvider {
    constructor() {
        this.network = client_1.AdNetwork.CUSTOM;
    }
    async verifyWatch(token) {
        return true;
    }
}
exports.CustomProvider = CustomProvider;
class AdsProviderFactory {
    static getProvider(network) {
        const provider = this.providers.get(network);
        if (!provider) {
            throw new common_1.BadRequestException(app_messages_1.AppMessages.general.invalidInput);
        }
        return provider;
    }
}
exports.AdsProviderFactory = AdsProviderFactory;
AdsProviderFactory.providers = new Map([
    [client_1.AdNetwork.ADMOB, new AdMobProvider()],
    [client_1.AdNetwork.UNITY, new UnityAdsProvider()],
    [client_1.AdNetwork.IRONSOURCE, new IronSourceProvider()],
    [client_1.AdNetwork.APPLOVIN, new AppLovinProvider()],
    [client_1.AdNetwork.HILLTOPADS, new HilltopAdsProvider()],
    [client_1.AdNetwork.ADSTERRA, new AdsterraProvider()],
    [client_1.AdNetwork.CUSTOM, new CustomProvider()],
]);
//# sourceMappingURL=ads-provider.factory.js.map