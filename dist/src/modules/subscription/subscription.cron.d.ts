import { SubscriptionService } from "./subscription.service";
export declare class SubscriptionCron {
    private readonly subscriptionService;
    private readonly logger;
    constructor(subscriptionService: SubscriptionService);
    handleExpiredSubscriptions(): Promise<void>;
}
