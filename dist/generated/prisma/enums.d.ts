export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly SUPER_ADMIN: "SUPER_ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const RecipientType: {
    readonly ALL: "ALL";
    readonly CUSTOMERS: "CUSTOMERS";
    readonly NON_CUSTOMERS: "NON_CUSTOMERS";
    readonly SPECIFIC_CATEGORY: "SPECIFIC_CATEGORY";
};
export type RecipientType = (typeof RecipientType)[keyof typeof RecipientType];
export declare const NotifType: {
    readonly NEW_PRODUCT: "NEW_PRODUCT";
    readonly CATEGORY_UPDATE: "CATEGORY_UPDATE";
    readonly PURCHASE_SUCCESS: "PURCHASE_SUCCESS";
    readonly REVIEW_APPROVED: "REVIEW_APPROVED";
    readonly SYSTEM: "SYSTEM";
    readonly PRICE_DROP: "PRICE_DROP";
    readonly ACCOUNT: "ACCOUNT";
};
export type NotifType = (typeof NotifType)[keyof typeof NotifType];
export declare const LogAction: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly PUBLISH: "PUBLISH";
    readonly UNPUBLISH: "UNPUBLISH";
    readonly LOGIN: "LOGIN";
    readonly LOGOUT: "LOGOUT";
    readonly EMAIL_SENT: "EMAIL_SENT";
    readonly PURCHASE: "PURCHASE";
    readonly ROLE_CHANGE: "ROLE_CHANGE";
    readonly SETTING_CHANGE: "SETTING_CHANGE";
};
export type LogAction = (typeof LogAction)[keyof typeof LogAction];
