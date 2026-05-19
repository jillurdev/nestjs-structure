"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAction = exports.NotifType = exports.RecipientType = exports.PaymentStatus = exports.Role = void 0;
exports.Role = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN'
};
exports.PaymentStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED'
};
exports.RecipientType = {
    ALL: 'ALL',
    CUSTOMERS: 'CUSTOMERS',
    NON_CUSTOMERS: 'NON_CUSTOMERS',
    SPECIFIC_CATEGORY: 'SPECIFIC_CATEGORY'
};
exports.NotifType = {
    NEW_PRODUCT: 'NEW_PRODUCT',
    CATEGORY_UPDATE: 'CATEGORY_UPDATE',
    PURCHASE_SUCCESS: 'PURCHASE_SUCCESS',
    REVIEW_APPROVED: 'REVIEW_APPROVED',
    SYSTEM: 'SYSTEM',
    PRICE_DROP: 'PRICE_DROP',
    ACCOUNT: 'ACCOUNT'
};
exports.LogAction = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    PUBLISH: 'PUBLISH',
    UNPUBLISH: 'UNPUBLISH',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    EMAIL_SENT: 'EMAIL_SENT',
    PURCHASE: 'PURCHASE',
    ROLE_CHANGE: 'ROLE_CHANGE',
    SETTING_CHANGE: 'SETTING_CHANGE'
};
//# sourceMappingURL=enums.js.map