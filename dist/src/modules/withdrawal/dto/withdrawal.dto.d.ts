import { WithdrawalMethod } from "@prisma/client";
export declare class CreateWithdrawalDto {
    amount: number;
    method: WithdrawalMethod;
    accountNumber: string;
    accountName: string;
}
export declare class ApproveWithdrawalDto {
    adminNote?: string;
}
export declare class RejectWithdrawalDto {
    adminNote: string;
}
