declare enum TopupMethod {
    BKASH = "BKASH",
    NAGAD = "NAGAD"
}
export declare class CreateTopupDto {
    amount: number;
    method: TopupMethod;
    transactionId: string;
    senderNumber: string;
}
export declare class ProcessTopupDto {
    adminNote?: string;
}
export {};
