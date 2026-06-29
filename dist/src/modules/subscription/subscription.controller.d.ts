import { SubscriptionService } from "./subscription.service";
import { Response } from "express";
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    getPlans(res: Response): Promise<void>;
    getStatus(user: any, res: Response): Promise<void>;
    upgrade(user: any, res: Response): Promise<void>;
    getAllSubscriptions(res: Response, page?: string, limit?: string): Promise<void>;
}
