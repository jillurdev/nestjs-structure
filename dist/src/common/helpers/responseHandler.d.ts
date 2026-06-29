import { TApiResponse, TDirectResponse } from "@/types/response.helper";
import { Response } from "express";
export declare const responseHandler: <T>(res: Response, data: TApiResponse<T>) => void;
export declare const sendDirectResponse: <T>(res: Response, data: TDirectResponse<T>) => void;
