"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.SiteSettingScalarFieldEnum = exports.EmailLogScalarFieldEnum = exports.SiteLogScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.ReviewScalarFieldEnum = exports.SavedItemScalarFieldEnum = exports.LikeScalarFieldEnum = exports.PurchaseScalarFieldEnum = exports.ProductTagScalarFieldEnum = exports.ProductImageScalarFieldEnum = exports.ProductScalarFieldEnum = exports.TagScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.6.0",
    engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Category: 'Category',
    Tag: 'Tag',
    Product: 'Product',
    ProductImage: 'ProductImage',
    ProductTag: 'ProductTag',
    Purchase: 'Purchase',
    Like: 'Like',
    SavedItem: 'SavedItem',
    Review: 'Review',
    Notification: 'Notification',
    SiteLog: 'SiteLog',
    EmailLog: 'EmailLog',
    SiteSetting: 'SiteSetting'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    avatar: 'avatar',
    isActive: 'isActive',
    emailVerified: 'emailVerified',
    emailVerifyToken: 'emailVerifyToken',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    icon: 'icon',
    coverImage: 'coverImage',
    isActive: 'isActive',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TagScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    createdAt: 'createdAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    price: 'price',
    previewVideoUrl: 'previewVideoUrl',
    fileUrl: 'fileUrl',
    thumbnailUrl: 'thumbnailUrl',
    isPublished: 'isPublished',
    isFeatured: 'isFeatured',
    viewCount: 'viewCount',
    downloadCount: 'downloadCount',
    categoryId: 'categoryId',
    uploadedById: 'uploadedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductImageScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    url: 'url',
    altText: 'altText',
    order: 'order',
    isCover: 'isCover',
    createdAt: 'createdAt'
};
exports.ProductTagScalarFieldEnum = {
    productId: 'productId',
    tagId: 'tagId'
};
exports.PurchaseScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    pricePaid: 'pricePaid',
    status: 'status',
    transactionId: 'transactionId',
    purchasedAt: 'purchasedAt'
};
exports.LikeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    createdAt: 'createdAt'
};
exports.SavedItemScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    savedAt: 'savedAt'
};
exports.ReviewScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    rating: 'rating',
    comment: 'comment',
    isApproved: 'isApproved',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    refId: 'refId',
    refType: 'refType',
    isRead: 'isRead',
    createdAt: 'createdAt'
};
exports.SiteLogScalarFieldEnum = {
    id: 'id',
    actorId: 'actorId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    detail: 'detail',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
exports.EmailLogScalarFieldEnum = {
    id: 'id',
    sentById: 'sentById',
    subject: 'subject',
    body: 'body',
    recipientType: 'recipientType',
    categoryId: 'categoryId',
    recipientCount: 'recipientCount',
    sentAt: 'sentAt'
};
exports.SiteSettingScalarFieldEnum = {
    id: 'id',
    key: 'key',
    value: 'value',
    group: 'group',
    description: 'description',
    updatedAt: 'updatedAt',
    updatedById: 'updatedById'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map