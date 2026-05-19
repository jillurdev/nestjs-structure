import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type SiteLogModel = runtime.Types.Result.DefaultSelection<Prisma.$SiteLogPayload>;
export type AggregateSiteLog = {
    _count: SiteLogCountAggregateOutputType | null;
    _min: SiteLogMinAggregateOutputType | null;
    _max: SiteLogMaxAggregateOutputType | null;
};
export type SiteLogMinAggregateOutputType = {
    id: string | null;
    actorId: string | null;
    action: $Enums.LogAction | null;
    entity: string | null;
    entityId: string | null;
    detail: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
};
export type SiteLogMaxAggregateOutputType = {
    id: string | null;
    actorId: string | null;
    action: $Enums.LogAction | null;
    entity: string | null;
    entityId: string | null;
    detail: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date | null;
};
export type SiteLogCountAggregateOutputType = {
    id: number;
    actorId: number;
    action: number;
    entity: number;
    entityId: number;
    detail: number;
    ipAddress: number;
    userAgent: number;
    createdAt: number;
    _all: number;
};
export type SiteLogMinAggregateInputType = {
    id?: true;
    actorId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    detail?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
};
export type SiteLogMaxAggregateInputType = {
    id?: true;
    actorId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    detail?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
};
export type SiteLogCountAggregateInputType = {
    id?: true;
    actorId?: true;
    action?: true;
    entity?: true;
    entityId?: true;
    detail?: true;
    ipAddress?: true;
    userAgent?: true;
    createdAt?: true;
    _all?: true;
};
export type SiteLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteLogWhereInput;
    orderBy?: Prisma.SiteLogOrderByWithRelationInput | Prisma.SiteLogOrderByWithRelationInput[];
    cursor?: Prisma.SiteLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SiteLogCountAggregateInputType;
    _min?: SiteLogMinAggregateInputType;
    _max?: SiteLogMaxAggregateInputType;
};
export type GetSiteLogAggregateType<T extends SiteLogAggregateArgs> = {
    [P in keyof T & keyof AggregateSiteLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiteLog[P]> : Prisma.GetScalarType<T[P], AggregateSiteLog[P]>;
};
export type SiteLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteLogWhereInput;
    orderBy?: Prisma.SiteLogOrderByWithAggregationInput | Prisma.SiteLogOrderByWithAggregationInput[];
    by: Prisma.SiteLogScalarFieldEnum[] | Prisma.SiteLogScalarFieldEnum;
    having?: Prisma.SiteLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SiteLogCountAggregateInputType | true;
    _min?: SiteLogMinAggregateInputType;
    _max?: SiteLogMaxAggregateInputType;
};
export type SiteLogGroupByOutputType = {
    id: string;
    actorId: string;
    action: $Enums.LogAction;
    entity: string;
    entityId: string | null;
    detail: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    _count: SiteLogCountAggregateOutputType | null;
    _min: SiteLogMinAggregateOutputType | null;
    _max: SiteLogMaxAggregateOutputType | null;
};
export type GetSiteLogGroupByPayload<T extends SiteLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SiteLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SiteLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SiteLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SiteLogGroupByOutputType[P]>;
}>>;
export type SiteLogWhereInput = {
    AND?: Prisma.SiteLogWhereInput | Prisma.SiteLogWhereInput[];
    OR?: Prisma.SiteLogWhereInput[];
    NOT?: Prisma.SiteLogWhereInput | Prisma.SiteLogWhereInput[];
    id?: Prisma.StringFilter<"SiteLog"> | string;
    actorId?: Prisma.StringFilter<"SiteLog"> | string;
    action?: Prisma.EnumLogActionFilter<"SiteLog"> | $Enums.LogAction;
    entity?: Prisma.StringFilter<"SiteLog"> | string;
    entityId?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    detail?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SiteLog"> | Date | string;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type SiteLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    detail?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type SiteLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SiteLogWhereInput | Prisma.SiteLogWhereInput[];
    OR?: Prisma.SiteLogWhereInput[];
    NOT?: Prisma.SiteLogWhereInput | Prisma.SiteLogWhereInput[];
    actorId?: Prisma.StringFilter<"SiteLog"> | string;
    action?: Prisma.EnumLogActionFilter<"SiteLog"> | $Enums.LogAction;
    entity?: Prisma.StringFilter<"SiteLog"> | string;
    entityId?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    detail?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SiteLog"> | Date | string;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type SiteLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    detail?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SiteLogCountOrderByAggregateInput;
    _max?: Prisma.SiteLogMaxOrderByAggregateInput;
    _min?: Prisma.SiteLogMinOrderByAggregateInput;
};
export type SiteLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.SiteLogScalarWhereWithAggregatesInput | Prisma.SiteLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.SiteLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SiteLogScalarWhereWithAggregatesInput | Prisma.SiteLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SiteLog"> | string;
    actorId?: Prisma.StringWithAggregatesFilter<"SiteLog"> | string;
    action?: Prisma.EnumLogActionWithAggregatesFilter<"SiteLog"> | $Enums.LogAction;
    entity?: Prisma.StringWithAggregatesFilter<"SiteLog"> | string;
    entityId?: Prisma.StringNullableWithAggregatesFilter<"SiteLog"> | string | null;
    detail?: Prisma.StringNullableWithAggregatesFilter<"SiteLog"> | string | null;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"SiteLog"> | string | null;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"SiteLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SiteLog"> | Date | string;
};
export type SiteLogCreateInput = {
    id?: string;
    action: $Enums.LogAction;
    entity: string;
    entityId?: string | null;
    detail?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
    actor: Prisma.UserCreateNestedOneWithoutSiteLogsInput;
};
export type SiteLogUncheckedCreateInput = {
    id?: string;
    actorId: string;
    action: $Enums.LogAction;
    entity: string;
    entityId?: string | null;
    detail?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type SiteLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumLogActionFieldUpdateOperationsInput | $Enums.LogAction;
    entity?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.UserUpdateOneRequiredWithoutSiteLogsNestedInput;
};
export type SiteLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumLogActionFieldUpdateOperationsInput | $Enums.LogAction;
    entity?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteLogCreateManyInput = {
    id?: string;
    actorId: string;
    action: $Enums.LogAction;
    entity: string;
    entityId?: string | null;
    detail?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type SiteLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumLogActionFieldUpdateOperationsInput | $Enums.LogAction;
    entity?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumLogActionFieldUpdateOperationsInput | $Enums.LogAction;
    entity?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteLogListRelationFilter = {
    every?: Prisma.SiteLogWhereInput;
    some?: Prisma.SiteLogWhereInput;
    none?: Prisma.SiteLogWhereInput;
};
export type SiteLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SiteLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SiteLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SiteLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entity?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SiteLogCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.SiteLogCreateWithoutActorInput, Prisma.SiteLogUncheckedCreateWithoutActorInput> | Prisma.SiteLogCreateWithoutActorInput[] | Prisma.SiteLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.SiteLogCreateOrConnectWithoutActorInput | Prisma.SiteLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.SiteLogCreateManyActorInputEnvelope;
    connect?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
};
export type SiteLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.SiteLogCreateWithoutActorInput, Prisma.SiteLogUncheckedCreateWithoutActorInput> | Prisma.SiteLogCreateWithoutActorInput[] | Prisma.SiteLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.SiteLogCreateOrConnectWithoutActorInput | Prisma.SiteLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.SiteLogCreateManyActorInputEnvelope;
    connect?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
};
export type SiteLogUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.SiteLogCreateWithoutActorInput, Prisma.SiteLogUncheckedCreateWithoutActorInput> | Prisma.SiteLogCreateWithoutActorInput[] | Prisma.SiteLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.SiteLogCreateOrConnectWithoutActorInput | Prisma.SiteLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.SiteLogUpsertWithWhereUniqueWithoutActorInput | Prisma.SiteLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.SiteLogCreateManyActorInputEnvelope;
    set?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    disconnect?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    delete?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    connect?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    update?: Prisma.SiteLogUpdateWithWhereUniqueWithoutActorInput | Prisma.SiteLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.SiteLogUpdateManyWithWhereWithoutActorInput | Prisma.SiteLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.SiteLogScalarWhereInput | Prisma.SiteLogScalarWhereInput[];
};
export type SiteLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.SiteLogCreateWithoutActorInput, Prisma.SiteLogUncheckedCreateWithoutActorInput> | Prisma.SiteLogCreateWithoutActorInput[] | Prisma.SiteLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.SiteLogCreateOrConnectWithoutActorInput | Prisma.SiteLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.SiteLogUpsertWithWhereUniqueWithoutActorInput | Prisma.SiteLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.SiteLogCreateManyActorInputEnvelope;
    set?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    disconnect?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    delete?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    connect?: Prisma.SiteLogWhereUniqueInput | Prisma.SiteLogWhereUniqueInput[];
    update?: Prisma.SiteLogUpdateWithWhereUniqueWithoutActorInput | Prisma.SiteLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.SiteLogUpdateManyWithWhereWithoutActorInput | Prisma.SiteLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.SiteLogScalarWhereInput | Prisma.SiteLogScalarWhereInput[];
};
export type EnumLogActionFieldUpdateOperationsInput = {
    set?: $Enums.LogAction;
};
export type SiteLogCreateWithoutActorInput = {
    id?: string;
    action: $Enums.LogAction;
    entity: string;
    entityId?: string | null;
    detail?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type SiteLogUncheckedCreateWithoutActorInput = {
    id?: string;
    action: $Enums.LogAction;
    entity: string;
    entityId?: string | null;
    detail?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type SiteLogCreateOrConnectWithoutActorInput = {
    where: Prisma.SiteLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteLogCreateWithoutActorInput, Prisma.SiteLogUncheckedCreateWithoutActorInput>;
};
export type SiteLogCreateManyActorInputEnvelope = {
    data: Prisma.SiteLogCreateManyActorInput | Prisma.SiteLogCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type SiteLogUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.SiteLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteLogUpdateWithoutActorInput, Prisma.SiteLogUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.SiteLogCreateWithoutActorInput, Prisma.SiteLogUncheckedCreateWithoutActorInput>;
};
export type SiteLogUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.SiteLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteLogUpdateWithoutActorInput, Prisma.SiteLogUncheckedUpdateWithoutActorInput>;
};
export type SiteLogUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.SiteLogScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteLogUpdateManyMutationInput, Prisma.SiteLogUncheckedUpdateManyWithoutActorInput>;
};
export type SiteLogScalarWhereInput = {
    AND?: Prisma.SiteLogScalarWhereInput | Prisma.SiteLogScalarWhereInput[];
    OR?: Prisma.SiteLogScalarWhereInput[];
    NOT?: Prisma.SiteLogScalarWhereInput | Prisma.SiteLogScalarWhereInput[];
    id?: Prisma.StringFilter<"SiteLog"> | string;
    actorId?: Prisma.StringFilter<"SiteLog"> | string;
    action?: Prisma.EnumLogActionFilter<"SiteLog"> | $Enums.LogAction;
    entity?: Prisma.StringFilter<"SiteLog"> | string;
    entityId?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    detail?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"SiteLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SiteLog"> | Date | string;
};
export type SiteLogCreateManyActorInput = {
    id?: string;
    action: $Enums.LogAction;
    entity: string;
    entityId?: string | null;
    detail?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt?: Date | string;
};
export type SiteLogUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumLogActionFieldUpdateOperationsInput | $Enums.LogAction;
    entity?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteLogUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumLogActionFieldUpdateOperationsInput | $Enums.LogAction;
    entity?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteLogUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumLogActionFieldUpdateOperationsInput | $Enums.LogAction;
    entity?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actorId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    detail?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siteLog"]>;
export type SiteLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actorId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    detail?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siteLog"]>;
export type SiteLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actorId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    detail?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["siteLog"]>;
export type SiteLogSelectScalar = {
    id?: boolean;
    actorId?: boolean;
    action?: boolean;
    entity?: boolean;
    entityId?: boolean;
    detail?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
};
export type SiteLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "actorId" | "action" | "entity" | "entityId" | "detail" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["siteLog"]>;
export type SiteLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SiteLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SiteLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $SiteLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SiteLog";
    objects: {
        actor: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        actorId: string;
        action: $Enums.LogAction;
        entity: string;
        entityId: string | null;
        detail: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["siteLog"]>;
    composites: {};
};
export type SiteLogGetPayload<S extends boolean | null | undefined | SiteLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SiteLogPayload, S>;
export type SiteLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SiteLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SiteLogCountAggregateInputType | true;
};
export interface SiteLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SiteLog'];
        meta: {
            name: 'SiteLog';
        };
    };
    findUnique<T extends SiteLogFindUniqueArgs>(args: Prisma.SelectSubset<T, SiteLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SiteLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SiteLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SiteLogFindFirstArgs>(args?: Prisma.SelectSubset<T, SiteLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SiteLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SiteLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SiteLogFindManyArgs>(args?: Prisma.SelectSubset<T, SiteLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SiteLogCreateArgs>(args: Prisma.SelectSubset<T, SiteLogCreateArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SiteLogCreateManyArgs>(args?: Prisma.SelectSubset<T, SiteLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SiteLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SiteLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SiteLogDeleteArgs>(args: Prisma.SelectSubset<T, SiteLogDeleteArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SiteLogUpdateArgs>(args: Prisma.SelectSubset<T, SiteLogUpdateArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SiteLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, SiteLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SiteLogUpdateManyArgs>(args: Prisma.SelectSubset<T, SiteLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SiteLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SiteLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SiteLogUpsertArgs>(args: Prisma.SelectSubset<T, SiteLogUpsertArgs<ExtArgs>>): Prisma.Prisma__SiteLogClient<runtime.Types.Result.GetResult<Prisma.$SiteLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SiteLogCountArgs>(args?: Prisma.Subset<T, SiteLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SiteLogCountAggregateOutputType> : number>;
    aggregate<T extends SiteLogAggregateArgs>(args: Prisma.Subset<T, SiteLogAggregateArgs>): Prisma.PrismaPromise<GetSiteLogAggregateType<T>>;
    groupBy<T extends SiteLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SiteLogGroupByArgs['orderBy'];
    } : {
        orderBy?: SiteLogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SiteLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SiteLogFieldRefs;
}
export interface Prisma__SiteLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    actor<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SiteLogFieldRefs {
    readonly id: Prisma.FieldRef<"SiteLog", 'String'>;
    readonly actorId: Prisma.FieldRef<"SiteLog", 'String'>;
    readonly action: Prisma.FieldRef<"SiteLog", 'LogAction'>;
    readonly entity: Prisma.FieldRef<"SiteLog", 'String'>;
    readonly entityId: Prisma.FieldRef<"SiteLog", 'String'>;
    readonly detail: Prisma.FieldRef<"SiteLog", 'String'>;
    readonly ipAddress: Prisma.FieldRef<"SiteLog", 'String'>;
    readonly userAgent: Prisma.FieldRef<"SiteLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SiteLog", 'DateTime'>;
}
export type SiteLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    where: Prisma.SiteLogWhereUniqueInput;
};
export type SiteLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    where: Prisma.SiteLogWhereUniqueInput;
};
export type SiteLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    where?: Prisma.SiteLogWhereInput;
    orderBy?: Prisma.SiteLogOrderByWithRelationInput | Prisma.SiteLogOrderByWithRelationInput[];
    cursor?: Prisma.SiteLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteLogScalarFieldEnum | Prisma.SiteLogScalarFieldEnum[];
};
export type SiteLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    where?: Prisma.SiteLogWhereInput;
    orderBy?: Prisma.SiteLogOrderByWithRelationInput | Prisma.SiteLogOrderByWithRelationInput[];
    cursor?: Prisma.SiteLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteLogScalarFieldEnum | Prisma.SiteLogScalarFieldEnum[];
};
export type SiteLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    where?: Prisma.SiteLogWhereInput;
    orderBy?: Prisma.SiteLogOrderByWithRelationInput | Prisma.SiteLogOrderByWithRelationInput[];
    cursor?: Prisma.SiteLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteLogScalarFieldEnum | Prisma.SiteLogScalarFieldEnum[];
};
export type SiteLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteLogCreateInput, Prisma.SiteLogUncheckedCreateInput>;
};
export type SiteLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SiteLogCreateManyInput | Prisma.SiteLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiteLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    data: Prisma.SiteLogCreateManyInput | Prisma.SiteLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SiteLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SiteLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteLogUpdateInput, Prisma.SiteLogUncheckedUpdateInput>;
    where: Prisma.SiteLogWhereUniqueInput;
};
export type SiteLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SiteLogUpdateManyMutationInput, Prisma.SiteLogUncheckedUpdateManyInput>;
    where?: Prisma.SiteLogWhereInput;
    limit?: number;
};
export type SiteLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteLogUpdateManyMutationInput, Prisma.SiteLogUncheckedUpdateManyInput>;
    where?: Prisma.SiteLogWhereInput;
    limit?: number;
    include?: Prisma.SiteLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SiteLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    where: Prisma.SiteLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteLogCreateInput, Prisma.SiteLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SiteLogUpdateInput, Prisma.SiteLogUncheckedUpdateInput>;
};
export type SiteLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
    where: Prisma.SiteLogWhereUniqueInput;
};
export type SiteLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteLogWhereInput;
    limit?: number;
};
export type SiteLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteLogSelect<ExtArgs> | null;
    omit?: Prisma.SiteLogOmit<ExtArgs> | null;
    include?: Prisma.SiteLogInclude<ExtArgs> | null;
};
