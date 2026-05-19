import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type SiteSettingModel = runtime.Types.Result.DefaultSelection<Prisma.$SiteSettingPayload>;
export type AggregateSiteSetting = {
    _count: SiteSettingCountAggregateOutputType | null;
    _min: SiteSettingMinAggregateOutputType | null;
    _max: SiteSettingMaxAggregateOutputType | null;
};
export type SiteSettingMinAggregateOutputType = {
    id: string | null;
    key: string | null;
    value: string | null;
    group: string | null;
    description: string | null;
    updatedAt: Date | null;
    updatedById: string | null;
};
export type SiteSettingMaxAggregateOutputType = {
    id: string | null;
    key: string | null;
    value: string | null;
    group: string | null;
    description: string | null;
    updatedAt: Date | null;
    updatedById: string | null;
};
export type SiteSettingCountAggregateOutputType = {
    id: number;
    key: number;
    value: number;
    group: number;
    description: number;
    updatedAt: number;
    updatedById: number;
    _all: number;
};
export type SiteSettingMinAggregateInputType = {
    id?: true;
    key?: true;
    value?: true;
    group?: true;
    description?: true;
    updatedAt?: true;
    updatedById?: true;
};
export type SiteSettingMaxAggregateInputType = {
    id?: true;
    key?: true;
    value?: true;
    group?: true;
    description?: true;
    updatedAt?: true;
    updatedById?: true;
};
export type SiteSettingCountAggregateInputType = {
    id?: true;
    key?: true;
    value?: true;
    group?: true;
    description?: true;
    updatedAt?: true;
    updatedById?: true;
    _all?: true;
};
export type SiteSettingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSettingWhereInput;
    orderBy?: Prisma.SiteSettingOrderByWithRelationInput | Prisma.SiteSettingOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SiteSettingCountAggregateInputType;
    _min?: SiteSettingMinAggregateInputType;
    _max?: SiteSettingMaxAggregateInputType;
};
export type GetSiteSettingAggregateType<T extends SiteSettingAggregateArgs> = {
    [P in keyof T & keyof AggregateSiteSetting]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiteSetting[P]> : Prisma.GetScalarType<T[P], AggregateSiteSetting[P]>;
};
export type SiteSettingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSettingWhereInput;
    orderBy?: Prisma.SiteSettingOrderByWithAggregationInput | Prisma.SiteSettingOrderByWithAggregationInput[];
    by: Prisma.SiteSettingScalarFieldEnum[] | Prisma.SiteSettingScalarFieldEnum;
    having?: Prisma.SiteSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SiteSettingCountAggregateInputType | true;
    _min?: SiteSettingMinAggregateInputType;
    _max?: SiteSettingMaxAggregateInputType;
};
export type SiteSettingGroupByOutputType = {
    id: string;
    key: string;
    value: string;
    group: string;
    description: string | null;
    updatedAt: Date;
    updatedById: string | null;
    _count: SiteSettingCountAggregateOutputType | null;
    _min: SiteSettingMinAggregateOutputType | null;
    _max: SiteSettingMaxAggregateOutputType | null;
};
export type GetSiteSettingGroupByPayload<T extends SiteSettingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SiteSettingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SiteSettingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SiteSettingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SiteSettingGroupByOutputType[P]>;
}>>;
export type SiteSettingWhereInput = {
    AND?: Prisma.SiteSettingWhereInput | Prisma.SiteSettingWhereInput[];
    OR?: Prisma.SiteSettingWhereInput[];
    NOT?: Prisma.SiteSettingWhereInput | Prisma.SiteSettingWhereInput[];
    id?: Prisma.StringFilter<"SiteSetting"> | string;
    key?: Prisma.StringFilter<"SiteSetting"> | string;
    value?: Prisma.StringFilter<"SiteSetting"> | string;
    group?: Prisma.StringFilter<"SiteSetting"> | string;
    description?: Prisma.StringNullableFilter<"SiteSetting"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"SiteSetting"> | Date | string;
    updatedById?: Prisma.StringNullableFilter<"SiteSetting"> | string | null;
    updatedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type SiteSettingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    group?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedBy?: Prisma.UserOrderByWithRelationInput;
};
export type SiteSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    key?: string;
    AND?: Prisma.SiteSettingWhereInput | Prisma.SiteSettingWhereInput[];
    OR?: Prisma.SiteSettingWhereInput[];
    NOT?: Prisma.SiteSettingWhereInput | Prisma.SiteSettingWhereInput[];
    value?: Prisma.StringFilter<"SiteSetting"> | string;
    group?: Prisma.StringFilter<"SiteSetting"> | string;
    description?: Prisma.StringNullableFilter<"SiteSetting"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"SiteSetting"> | Date | string;
    updatedById?: Prisma.StringNullableFilter<"SiteSetting"> | string | null;
    updatedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "key">;
export type SiteSettingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    group?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SiteSettingCountOrderByAggregateInput;
    _max?: Prisma.SiteSettingMaxOrderByAggregateInput;
    _min?: Prisma.SiteSettingMinOrderByAggregateInput;
};
export type SiteSettingScalarWhereWithAggregatesInput = {
    AND?: Prisma.SiteSettingScalarWhereWithAggregatesInput | Prisma.SiteSettingScalarWhereWithAggregatesInput[];
    OR?: Prisma.SiteSettingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SiteSettingScalarWhereWithAggregatesInput | Prisma.SiteSettingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SiteSetting"> | string;
    key?: Prisma.StringWithAggregatesFilter<"SiteSetting"> | string;
    value?: Prisma.StringWithAggregatesFilter<"SiteSetting"> | string;
    group?: Prisma.StringWithAggregatesFilter<"SiteSetting"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"SiteSetting"> | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SiteSetting"> | Date | string;
    updatedById?: Prisma.StringNullableWithAggregatesFilter<"SiteSetting"> | string | null;
};
export type SiteSettingCreateInput = {
    id?: string;
    key: string;
    value: string;
    group: string;
    description?: string | null;
    updatedAt?: Date | string;
    updatedBy?: Prisma.UserCreateNestedOneWithoutSettingsUpdatedInput;
};
export type SiteSettingUncheckedCreateInput = {
    id?: string;
    key: string;
    value: string;
    group: string;
    description?: string | null;
    updatedAt?: Date | string;
    updatedById?: string | null;
};
export type SiteSettingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    group?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedBy?: Prisma.UserUpdateOneWithoutSettingsUpdatedNestedInput;
};
export type SiteSettingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    group?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SiteSettingCreateManyInput = {
    id?: string;
    key: string;
    value: string;
    group: string;
    description?: string | null;
    updatedAt?: Date | string;
    updatedById?: string | null;
};
export type SiteSettingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    group?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    group?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SiteSettingListRelationFilter = {
    every?: Prisma.SiteSettingWhereInput;
    some?: Prisma.SiteSettingWhereInput;
    none?: Prisma.SiteSettingWhereInput;
};
export type SiteSettingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SiteSettingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    group?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
};
export type SiteSettingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    group?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
};
export type SiteSettingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    group?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
};
export type SiteSettingCreateNestedManyWithoutUpdatedByInput = {
    create?: Prisma.XOR<Prisma.SiteSettingCreateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput> | Prisma.SiteSettingCreateWithoutUpdatedByInput[] | Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput | Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput[];
    createMany?: Prisma.SiteSettingCreateManyUpdatedByInputEnvelope;
    connect?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
};
export type SiteSettingUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: Prisma.XOR<Prisma.SiteSettingCreateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput> | Prisma.SiteSettingCreateWithoutUpdatedByInput[] | Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput | Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput[];
    createMany?: Prisma.SiteSettingCreateManyUpdatedByInputEnvelope;
    connect?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
};
export type SiteSettingUpdateManyWithoutUpdatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSettingCreateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput> | Prisma.SiteSettingCreateWithoutUpdatedByInput[] | Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput | Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput[];
    upsert?: Prisma.SiteSettingUpsertWithWhereUniqueWithoutUpdatedByInput | Prisma.SiteSettingUpsertWithWhereUniqueWithoutUpdatedByInput[];
    createMany?: Prisma.SiteSettingCreateManyUpdatedByInputEnvelope;
    set?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    disconnect?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    delete?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    connect?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    update?: Prisma.SiteSettingUpdateWithWhereUniqueWithoutUpdatedByInput | Prisma.SiteSettingUpdateWithWhereUniqueWithoutUpdatedByInput[];
    updateMany?: Prisma.SiteSettingUpdateManyWithWhereWithoutUpdatedByInput | Prisma.SiteSettingUpdateManyWithWhereWithoutUpdatedByInput[];
    deleteMany?: Prisma.SiteSettingScalarWhereInput | Prisma.SiteSettingScalarWhereInput[];
};
export type SiteSettingUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SiteSettingCreateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput> | Prisma.SiteSettingCreateWithoutUpdatedByInput[] | Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput | Prisma.SiteSettingCreateOrConnectWithoutUpdatedByInput[];
    upsert?: Prisma.SiteSettingUpsertWithWhereUniqueWithoutUpdatedByInput | Prisma.SiteSettingUpsertWithWhereUniqueWithoutUpdatedByInput[];
    createMany?: Prisma.SiteSettingCreateManyUpdatedByInputEnvelope;
    set?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    disconnect?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    delete?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    connect?: Prisma.SiteSettingWhereUniqueInput | Prisma.SiteSettingWhereUniqueInput[];
    update?: Prisma.SiteSettingUpdateWithWhereUniqueWithoutUpdatedByInput | Prisma.SiteSettingUpdateWithWhereUniqueWithoutUpdatedByInput[];
    updateMany?: Prisma.SiteSettingUpdateManyWithWhereWithoutUpdatedByInput | Prisma.SiteSettingUpdateManyWithWhereWithoutUpdatedByInput[];
    deleteMany?: Prisma.SiteSettingScalarWhereInput | Prisma.SiteSettingScalarWhereInput[];
};
export type SiteSettingCreateWithoutUpdatedByInput = {
    id?: string;
    key: string;
    value: string;
    group: string;
    description?: string | null;
    updatedAt?: Date | string;
};
export type SiteSettingUncheckedCreateWithoutUpdatedByInput = {
    id?: string;
    key: string;
    value: string;
    group: string;
    description?: string | null;
    updatedAt?: Date | string;
};
export type SiteSettingCreateOrConnectWithoutUpdatedByInput = {
    where: Prisma.SiteSettingWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSettingCreateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput>;
};
export type SiteSettingCreateManyUpdatedByInputEnvelope = {
    data: Prisma.SiteSettingCreateManyUpdatedByInput | Prisma.SiteSettingCreateManyUpdatedByInput[];
    skipDuplicates?: boolean;
};
export type SiteSettingUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: Prisma.SiteSettingWhereUniqueInput;
    update: Prisma.XOR<Prisma.SiteSettingUpdateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedUpdateWithoutUpdatedByInput>;
    create: Prisma.XOR<Prisma.SiteSettingCreateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedCreateWithoutUpdatedByInput>;
};
export type SiteSettingUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: Prisma.SiteSettingWhereUniqueInput;
    data: Prisma.XOR<Prisma.SiteSettingUpdateWithoutUpdatedByInput, Prisma.SiteSettingUncheckedUpdateWithoutUpdatedByInput>;
};
export type SiteSettingUpdateManyWithWhereWithoutUpdatedByInput = {
    where: Prisma.SiteSettingScalarWhereInput;
    data: Prisma.XOR<Prisma.SiteSettingUpdateManyMutationInput, Prisma.SiteSettingUncheckedUpdateManyWithoutUpdatedByInput>;
};
export type SiteSettingScalarWhereInput = {
    AND?: Prisma.SiteSettingScalarWhereInput | Prisma.SiteSettingScalarWhereInput[];
    OR?: Prisma.SiteSettingScalarWhereInput[];
    NOT?: Prisma.SiteSettingScalarWhereInput | Prisma.SiteSettingScalarWhereInput[];
    id?: Prisma.StringFilter<"SiteSetting"> | string;
    key?: Prisma.StringFilter<"SiteSetting"> | string;
    value?: Prisma.StringFilter<"SiteSetting"> | string;
    group?: Prisma.StringFilter<"SiteSetting"> | string;
    description?: Prisma.StringNullableFilter<"SiteSetting"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"SiteSetting"> | Date | string;
    updatedById?: Prisma.StringNullableFilter<"SiteSetting"> | string | null;
};
export type SiteSettingCreateManyUpdatedByInput = {
    id?: string;
    key: string;
    value: string;
    group: string;
    description?: string | null;
    updatedAt?: Date | string;
};
export type SiteSettingUpdateWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    group?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingUncheckedUpdateWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    group?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    group?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    value?: boolean;
    group?: boolean;
    description?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
    updatedBy?: boolean | Prisma.SiteSetting$updatedByArgs<ExtArgs>;
}, ExtArgs["result"]["siteSetting"]>;
export type SiteSettingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    value?: boolean;
    group?: boolean;
    description?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
    updatedBy?: boolean | Prisma.SiteSetting$updatedByArgs<ExtArgs>;
}, ExtArgs["result"]["siteSetting"]>;
export type SiteSettingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    value?: boolean;
    group?: boolean;
    description?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
    updatedBy?: boolean | Prisma.SiteSetting$updatedByArgs<ExtArgs>;
}, ExtArgs["result"]["siteSetting"]>;
export type SiteSettingSelectScalar = {
    id?: boolean;
    key?: boolean;
    value?: boolean;
    group?: boolean;
    description?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
};
export type SiteSettingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "key" | "value" | "group" | "description" | "updatedAt" | "updatedById", ExtArgs["result"]["siteSetting"]>;
export type SiteSettingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    updatedBy?: boolean | Prisma.SiteSetting$updatedByArgs<ExtArgs>;
};
export type SiteSettingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    updatedBy?: boolean | Prisma.SiteSetting$updatedByArgs<ExtArgs>;
};
export type SiteSettingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    updatedBy?: boolean | Prisma.SiteSetting$updatedByArgs<ExtArgs>;
};
export type $SiteSettingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SiteSetting";
    objects: {
        updatedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        key: string;
        value: string;
        group: string;
        description: string | null;
        updatedAt: Date;
        updatedById: string | null;
    }, ExtArgs["result"]["siteSetting"]>;
    composites: {};
};
export type SiteSettingGetPayload<S extends boolean | null | undefined | SiteSettingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload, S>;
export type SiteSettingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SiteSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SiteSettingCountAggregateInputType | true;
};
export interface SiteSettingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SiteSetting'];
        meta: {
            name: 'SiteSetting';
        };
    };
    findUnique<T extends SiteSettingFindUniqueArgs>(args: Prisma.SelectSubset<T, SiteSettingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SiteSettingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SiteSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SiteSettingFindFirstArgs>(args?: Prisma.SelectSubset<T, SiteSettingFindFirstArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SiteSettingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SiteSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SiteSettingFindManyArgs>(args?: Prisma.SelectSubset<T, SiteSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SiteSettingCreateArgs>(args: Prisma.SelectSubset<T, SiteSettingCreateArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SiteSettingCreateManyArgs>(args?: Prisma.SelectSubset<T, SiteSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SiteSettingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SiteSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SiteSettingDeleteArgs>(args: Prisma.SelectSubset<T, SiteSettingDeleteArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SiteSettingUpdateArgs>(args: Prisma.SelectSubset<T, SiteSettingUpdateArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SiteSettingDeleteManyArgs>(args?: Prisma.SelectSubset<T, SiteSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SiteSettingUpdateManyArgs>(args: Prisma.SelectSubset<T, SiteSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SiteSettingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SiteSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SiteSettingUpsertArgs>(args: Prisma.SelectSubset<T, SiteSettingUpsertArgs<ExtArgs>>): Prisma.Prisma__SiteSettingClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SiteSettingCountArgs>(args?: Prisma.Subset<T, SiteSettingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SiteSettingCountAggregateOutputType> : number>;
    aggregate<T extends SiteSettingAggregateArgs>(args: Prisma.Subset<T, SiteSettingAggregateArgs>): Prisma.PrismaPromise<GetSiteSettingAggregateType<T>>;
    groupBy<T extends SiteSettingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SiteSettingGroupByArgs['orderBy'];
    } : {
        orderBy?: SiteSettingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SiteSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SiteSettingFieldRefs;
}
export interface Prisma__SiteSettingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    updatedBy<T extends Prisma.SiteSetting$updatedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SiteSetting$updatedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SiteSettingFieldRefs {
    readonly id: Prisma.FieldRef<"SiteSetting", 'String'>;
    readonly key: Prisma.FieldRef<"SiteSetting", 'String'>;
    readonly value: Prisma.FieldRef<"SiteSetting", 'String'>;
    readonly group: Prisma.FieldRef<"SiteSetting", 'String'>;
    readonly description: Prisma.FieldRef<"SiteSetting", 'String'>;
    readonly updatedAt: Prisma.FieldRef<"SiteSetting", 'DateTime'>;
    readonly updatedById: Prisma.FieldRef<"SiteSetting", 'String'>;
}
export type SiteSettingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    where: Prisma.SiteSettingWhereUniqueInput;
};
export type SiteSettingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    where: Prisma.SiteSettingWhereUniqueInput;
};
export type SiteSettingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    where?: Prisma.SiteSettingWhereInput;
    orderBy?: Prisma.SiteSettingOrderByWithRelationInput | Prisma.SiteSettingOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSettingScalarFieldEnum | Prisma.SiteSettingScalarFieldEnum[];
};
export type SiteSettingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    where?: Prisma.SiteSettingWhereInput;
    orderBy?: Prisma.SiteSettingOrderByWithRelationInput | Prisma.SiteSettingOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSettingScalarFieldEnum | Prisma.SiteSettingScalarFieldEnum[];
};
export type SiteSettingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    where?: Prisma.SiteSettingWhereInput;
    orderBy?: Prisma.SiteSettingOrderByWithRelationInput | Prisma.SiteSettingOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSettingScalarFieldEnum | Prisma.SiteSettingScalarFieldEnum[];
};
export type SiteSettingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSettingCreateInput, Prisma.SiteSettingUncheckedCreateInput>;
};
export type SiteSettingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SiteSettingCreateManyInput | Prisma.SiteSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiteSettingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    data: Prisma.SiteSettingCreateManyInput | Prisma.SiteSettingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SiteSettingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SiteSettingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSettingUpdateInput, Prisma.SiteSettingUncheckedUpdateInput>;
    where: Prisma.SiteSettingWhereUniqueInput;
};
export type SiteSettingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SiteSettingUpdateManyMutationInput, Prisma.SiteSettingUncheckedUpdateManyInput>;
    where?: Prisma.SiteSettingWhereInput;
    limit?: number;
};
export type SiteSettingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSettingUpdateManyMutationInput, Prisma.SiteSettingUncheckedUpdateManyInput>;
    where?: Prisma.SiteSettingWhereInput;
    limit?: number;
    include?: Prisma.SiteSettingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SiteSettingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    where: Prisma.SiteSettingWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSettingCreateInput, Prisma.SiteSettingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SiteSettingUpdateInput, Prisma.SiteSettingUncheckedUpdateInput>;
};
export type SiteSettingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
    where: Prisma.SiteSettingWhereUniqueInput;
};
export type SiteSettingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSettingWhereInput;
    limit?: number;
};
export type SiteSetting$updatedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type SiteSettingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingOmit<ExtArgs> | null;
    include?: Prisma.SiteSettingInclude<ExtArgs> | null;
};
