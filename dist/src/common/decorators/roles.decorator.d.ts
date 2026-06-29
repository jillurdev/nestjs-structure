export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    OWNER = "OWNER"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
