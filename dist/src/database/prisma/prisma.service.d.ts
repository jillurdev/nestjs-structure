import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    findUserByIdOrThrow(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        referralCode: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
        banReason: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
    }>;
    findUserFieldsOrThrow<T extends Record<string, boolean>>(id: string, select: T): Promise<{ [K in keyof T as (T & object)[K] extends false | {
        ifUndefined<T_1>(value: T_1 | undefined): T_1 | any;
    } | null | undefined ? never : K]: (T & object)[K] extends object ? import(".prisma/client").Prisma.$UserPayload<import("@prisma/client/runtime/client").DefaultArgs> extends infer T_1 ? T_1 extends import(".prisma/client").Prisma.$UserPayload<import("@prisma/client/runtime/client").DefaultArgs> ? T_1 extends import("@prisma/client/runtime/client").SelectablePayloadFields<K, (infer O)[]> ? O extends import("@prisma/client/runtime/client").OperationPayload ? import("@prisma/client/runtime/client").GetFindResult<O, (T & object)[K], import(".prisma/client").Prisma.PrismaClientOptions>[] : never : T_1 extends import("@prisma/client/runtime/client").SelectablePayloadFields<K, infer O_1 | null> ? O_1 extends import("@prisma/client/runtime/client").OperationPayload ? import("@prisma/client/runtime/client").GetFindResult<O_1, (T & object)[K], import(".prisma/client").Prisma.PrismaClientOptions> | (import("@prisma/client/runtime/client").SelectField<T_1, K> & null) : never : K extends "_count" ? import("@prisma/client/runtime/client").GetFindResult<T_1, (T & object)[K], import(".prisma/client").Prisma.PrismaClientOptions> extends infer T_2 ? { [K_2 in keyof T_2]: number; } : never : never : never : never : import(".prisma/client").Prisma.$UserPayload<import("@prisma/client/runtime/client").DefaultArgs> extends infer T_3 ? T_3 extends import(".prisma/client").Prisma.$UserPayload<import("@prisma/client/runtime/client").DefaultArgs> ? T_3 extends import("@prisma/client/runtime/client").SelectablePayloadFields<K, (infer O_2)[]> ? O_2 extends import("@prisma/client/runtime/client").OperationPayload ? import("@prisma/client/runtime/client").Compute<(O_2 extends {
        scalars: infer S;
        composites: infer C;
    }[] ? (S & import("@prisma/client/runtime/client").UnwrapPayload<C>)[] : O_2 extends {
        scalars: infer S_1;
        composites: infer C_1;
    } | null ? (S_1 & import("@prisma/client/runtime/client").UnwrapPayload<C_1>) | import("@prisma/client/runtime/client").Select<null & O_2, null> | import("@prisma/client/runtime/client").Select<{
        scalars: infer S_1;
        composites: infer C_1;
    } & O_2, null> : never) extends infer T_4 ? { [K_3 in keyof T_4 as import("@prisma/client/runtime/client").OmitValue<{}, K_3> extends true ? never : K_3]: T_4[K_3]; } : never>[] : never : T_3 extends import("@prisma/client/runtime/client").SelectablePayloadFields<K, infer O_3 | null> ? O_3 extends import("@prisma/client/runtime/client").OperationPayload ? import("@prisma/client/runtime/client").Compute<(O_3 extends {
        scalars: infer S;
        composites: infer C;
    }[] ? (S & import("@prisma/client/runtime/client").UnwrapPayload<C>)[] : O_3 extends {
        scalars: infer S_1;
        composites: infer C_1;
    } | null ? (S_1 & import("@prisma/client/runtime/client").UnwrapPayload<C_1>) | import("@prisma/client/runtime/client").Select<null & O_3, null> | import("@prisma/client/runtime/client").Select<{
        scalars: infer S_1;
        composites: infer C_1;
    } & O_3, null> : never) extends infer T_5 ? { [K_4 in keyof T_5 as import("@prisma/client/runtime/client").OmitValue<{}, K_4> extends true ? never : K_4]: T_5[K_4]; } : never> | (import("@prisma/client/runtime/client").SelectField<T_3, K> & null) : never : T_3 extends {
        scalars: { [k in K]: infer O_4; };
    } ? O_4 : K extends "_count" ? T_3["objects"] extends infer T_6 ? { [K_5 in keyof T_6]: number; } : never : never : never : never; }>;
    findUserByPhoneOrThrow(phone: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        phone: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        referralCode: string | null;
        refreshToken: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
        banReason: string | null;
        bannedAt: Date | null;
        bannedBy: string | null;
        fcmToken: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
    }>;
    findUserByPhone(phone: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        phone: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        referralCode: string | null;
        refreshToken: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
        banReason: string | null;
        bannedAt: Date | null;
        bannedBy: string | null;
        fcmToken: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
    } | null>;
    findUserByEmail(email: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        phone: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        referralCode: string | null;
        refreshToken: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
        banReason: string | null;
        bannedAt: Date | null;
        bannedBy: string | null;
        fcmToken: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
    } | null>;
    userExistsByPhone(phone: string): Promise<boolean>;
    userExistsByEmail(email: string): Promise<boolean>;
    userCountByDeviceId(deviceId: string): Promise<number>;
}
