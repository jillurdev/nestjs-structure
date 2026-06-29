"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDirectResponse = exports.responseHandler = void 0;
const responseHandler = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.responseHandler = responseHandler;
const sendDirectResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        token: data.token,
    };
    res.status(data.statusCode).json(responseData);
};
exports.sendDirectResponse = sendDirectResponse;
//# sourceMappingURL=responseHandler.js.map