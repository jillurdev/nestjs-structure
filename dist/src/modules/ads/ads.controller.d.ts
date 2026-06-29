import { AdsService } from "./ads.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { WatchAdDto } from "./dto/watch-ad.dto";
import { Response, Request } from "express";
export declare class AdsController {
    private readonly adsService;
    constructor(adsService: AdsService);
    getAvailableAds(user: any, res: Response): Promise<void>;
    watchAd(dto: WatchAdDto, user: any, res: Response, req: Request): Promise<void>;
    getDailyStats(user: any, res: Response): Promise<void>;
    getWatchHistory(user: any, res: Response, page?: string, limit?: string): Promise<void>;
    getAllAds(res: Response): Promise<void>;
    toggleAd(id: string, res: Response): Promise<void>;
    createAd(dto: CreateAdDto, user: any, res: Response): Promise<void>;
    deleteAd(id: string, res: Response): Promise<void>;
}
