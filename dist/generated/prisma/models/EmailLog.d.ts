import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type EmailLogModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailLogPayload>;
export type AggregateEmailLog = {
    _count: EmailLogCountAggregateOutputType | null;
    _avg: EmailLogAvgAggregateOutputType | null;
    _sum: EmailLogSumAggregateOutputType | null;
    _min: EmailLogMinAggregateOutputType | null;
    _max: EmailLogMaxAggregateOutputType | null;
};
export type EmailLogAvgAggregateOutputType = {
    recipientCount: number | null;
};
export type EmailLogSumAggregateOutputType = {
    recipientCount: number | null;
};
export type EmailLogMinAggregateOutputType = {
    id: string | null;
    sentById: string | null;
    subject: string | null;
    body: string | null;
    recipientType: $Enums.RecipientType | null;
    categoryId: string | null;
    recipientCount: number | null;
    sentAt: Date | null;
};
export type EmailLogMaxAggregateOutputType = {
    id: string | null;
    sentById: string | null;
    subject: string | null;
    body: string | null;
    recipientType: $Enums.RecipientType | null;
    categoryId: string | null;
    recipientCount: number | null;
    sentAt: Date | null;
};
export type EmailLogCountAggregateOutputType = {
    id: number;
    sentById: number;
    subject: number;
    body: number;
    recipientType: number;
    categoryId: number;
    recipientCount: number;
    sentAt: number;
    _all: number;
};
export type EmailLogAvgAggregateInputType = {
    recipientCount?: true;
};
export type EmailLogSumAggregateInputType = {
    recipientCount?: true;
};
export type EmailLogMinAggregateInputType = {
    id?: true;
    sentById?: true;
    subject?: true;
    body?: true;
    recipientType?: true;
    categoryId?: true;
    recipientCount?: true;
    sentAt?: true;
};
export type EmailLogMaxAggregateInputType = {
    id?: true;
    sentById?: true;
    subject?: true;
    body?: true;
    recipientType?: true;
    categoryId?: true;
    recipientCount?: true;
    sentAt?: true;
};
export type EmailLogCountAggregateInputType = {
    id?: true;
    sentById?: true;
    subject?: true;
    body?: true;
    recipientType?: true;
    categoryId?: true;
    recipientCount?: true;
    sentAt?: true;
    _all?: true;
};
export type EmailLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmailLogCountAggregateInputType;
    _avg?: EmailLogAvgAggregateInputType;
    _sum?: EmailLogSumAggregateInputType;
    _min?: EmailLogMinAggregateInputType;
    _max?: EmailLogMaxAggregateInputType;
};
export type GetEmailLogAggregateType<T extends EmailLogAggregateArgs> = {
    [P in keyof T & keyof AggregateEmailLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmailLog[P]> : Prisma.GetScalarType<T[P], AggregateEmailLog[P]>;
};
export type EmailLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithAggregationInput | Prisma.EmailLogOrderByWithAggregationInput[];
    by: Prisma.EmailLogScalarFieldEnum[] | Prisma.EmailLogScalarFieldEnum;
    having?: Prisma.EmailLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmailLogCountAggregateInputType | true;
    _avg?: EmailLogAvgAggregateInputType;
    _sum?: EmailLogSumAggregateInputType;
    _min?: EmailLogMinAggregateInputType;
    _max?: EmailLogMaxAggregateInputType;
};
export type EmailLogGroupByOutputType = {
    id: string;
    sentById: string;
    subject: string;
    body: string;
    recipientType: $Enums.RecipientType;
    categoryId: string | null;
    recipientCount: number;
    sentAt: Date;
    _count: EmailLogCountAggregateOutputType | null;
    _avg: EmailLogAvgAggregateOutputType | null;
    _sum: EmailLogSumAggregateOutputType | null;
    _min: EmailLogMinAggregateOutputType | null;
    _max: EmailLogMaxAggregateOutputType | null;
};
export type GetEmailLogGroupByPayload<T extends EmailLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmailLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmailLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmailLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmailLogGroupByOutputType[P]>;
}>>;
export type EmailLogWhereInput = {
    AND?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    OR?: Prisma.EmailLogWhereInput[];
    NOT?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    id?: Prisma.StringFilter<"EmailLog"> | string;
    sentById?: Prisma.StringFilter<"EmailLog"> | string;
    subject?: Prisma.StringFilter<"EmailLog"> | string;
    body?: Prisma.StringFilter<"EmailLog"> | string;
    recipientType?: Prisma.EnumRecipientTypeFilter<"EmailLog"> | $Enums.RecipientType;
    categoryId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    recipientCount?: Prisma.IntFilter<"EmailLog"> | number;
    sentAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string;
    sentBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type EmailLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    recipientType?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    recipientCount?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    sentBy?: Prisma.UserOrderByWithRelationInput;
};
export type EmailLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    OR?: Prisma.EmailLogWhereInput[];
    NOT?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[];
    sentById?: Prisma.StringFilter<"EmailLog"> | string;
    subject?: Prisma.StringFilter<"EmailLog"> | string;
    body?: Prisma.StringFilter<"EmailLog"> | string;
    recipientType?: Prisma.EnumRecipientTypeFilter<"EmailLog"> | $Enums.RecipientType;
    categoryId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    recipientCount?: Prisma.IntFilter<"EmailLog"> | number;
    sentAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string;
    sentBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type EmailLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    recipientType?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    recipientCount?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    _count?: Prisma.EmailLogCountOrderByAggregateInput;
    _avg?: Prisma.EmailLogAvgOrderByAggregateInput;
    _max?: Prisma.EmailLogMaxOrderByAggregateInput;
    _min?: Prisma.EmailLogMinOrderByAggregateInput;
    _sum?: Prisma.EmailLogSumOrderByAggregateInput;
};
export type EmailLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmailLogScalarWhereWithAggregatesInput | Prisma.EmailLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmailLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmailLogScalarWhereWithAggregatesInput | Prisma.EmailLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    sentById?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    subject?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    body?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string;
    recipientType?: Prisma.EnumRecipientTypeWithAggregatesFilter<"EmailLog"> | $Enums.RecipientType;
    categoryId?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null;
    recipientCount?: Prisma.IntWithAggregatesFilter<"EmailLog"> | number;
    sentAt?: Prisma.DateTimeWithAggregatesFilter<"EmailLog"> | Date | string;
};
export type EmailLogCreateInput = {
    id?: string;
    subject: string;
    body: string;
    recipientType: $Enums.RecipientType;
    categoryId?: string | null;
    recipientCount: number;
    sentAt?: Date | string;
    sentBy: Prisma.UserCreateNestedOneWithoutEmailsSentInput;
};
export type EmailLogUncheckedCreateInput = {
    id?: string;
    sentById: string;
    subject: string;
    body: string;
    recipientType: $Enums.RecipientType;
    categoryId?: string | null;
    recipientCount: number;
    sentAt?: Date | string;
};
export type EmailLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientType?: Prisma.EnumRecipientTypeFieldUpdateOperationsInput | $Enums.RecipientType;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recipientCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sentBy?: Prisma.UserUpdateOneRequiredWithoutEmailsSentNestedInput;
};
export type EmailLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sentById?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientType?: Prisma.EnumRecipientTypeFieldUpdateOperationsInput | $Enums.RecipientType;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recipientCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogCreateManyInput = {
    id?: string;
    sentById: string;
    subject: string;
    body: string;
    recipientType: $Enums.RecipientType;
    categoryId?: string | null;
    recipientCount: number;
    sentAt?: Date | string;
};
export type EmailLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientType?: Prisma.EnumRecipientTypeFieldUpdateOperationsInput | $Enums.RecipientType;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recipientCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sentById?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientType?: Prisma.EnumRecipientTypeFieldUpdateOperationsInput | $Enums.RecipientType;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recipientCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogListRelationFilter = {
    every?: Prisma.EmailLogWhereInput;
    some?: Prisma.EmailLogWhereInput;
    none?: Prisma.EmailLogWhereInput;
};
export type EmailLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EmailLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    recipientType?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    recipientCount?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type EmailLogAvgOrderByAggregateInput = {
    recipientCount?: Prisma.SortOrder;
};
export type EmailLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    recipientType?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    recipientCount?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type EmailLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sentById?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    recipientType?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    recipientCount?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
};
export type EmailLogSumOrderByAggregateInput = {
    recipientCount?: Prisma.SortOrder;
};
export type EmailLogCreateNestedManyWithoutSentByInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutSentByInput, Prisma.EmailLogUncheckedCreateWithoutSentByInput> | Prisma.EmailLogCreateWithoutSentByInput[] | Prisma.EmailLogUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutSentByInput | Prisma.EmailLogCreateOrConnectWithoutSentByInput[];
    createMany?: Prisma.EmailLogCreateManySentByInputEnvelope;
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
};
export type EmailLogUncheckedCreateNestedManyWithoutSentByInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutSentByInput, Prisma.EmailLogUncheckedCreateWithoutSentByInput> | Prisma.EmailLogCreateWithoutSentByInput[] | Prisma.EmailLogUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutSentByInput | Prisma.EmailLogCreateOrConnectWithoutSentByInput[];
    createMany?: Prisma.EmailLogCreateManySentByInputEnvelope;
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
};
export type EmailLogUpdateManyWithoutSentByNestedInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutSentByInput, Prisma.EmailLogUncheckedCreateWithoutSentByInput> | Prisma.EmailLogCreateWithoutSentByInput[] | Prisma.EmailLogUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutSentByInput | Prisma.EmailLogCreateOrConnectWithoutSentByInput[];
    upsert?: Prisma.EmailLogUpsertWithWhereUniqueWithoutSentByInput | Prisma.EmailLogUpsertWithWhereUniqueWithoutSentByInput[];
    createMany?: Prisma.EmailLogCreateManySentByInputEnvelope;
    set?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    disconnect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    delete?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    update?: Prisma.EmailLogUpdateWithWhereUniqueWithoutSentByInput | Prisma.EmailLogUpdateWithWhereUniqueWithoutSentByInput[];
    updateMany?: Prisma.EmailLogUpdateManyWithWhereWithoutSentByInput | Prisma.EmailLogUpdateManyWithWhereWithoutSentByInput[];
    deleteMany?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
};
export type EmailLogUncheckedUpdateManyWithoutSentByNestedInput = {
    create?: Prisma.XOR<Prisma.EmailLogCreateWithoutSentByInput, Prisma.EmailLogUncheckedCreateWithoutSentByInput> | Prisma.EmailLogCreateWithoutSentByInput[] | Prisma.EmailLogUncheckedCreateWithoutSentByInput[];
    connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutSentByInput | Prisma.EmailLogCreateOrConnectWithoutSentByInput[];
    upsert?: Prisma.EmailLogUpsertWithWhereUniqueWithoutSentByInput | Prisma.EmailLogUpsertWithWhereUniqueWithoutSentByInput[];
    createMany?: Prisma.EmailLogCreateManySentByInputEnvelope;
    set?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    disconnect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    delete?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[];
    update?: Prisma.EmailLogUpdateWithWhereUniqueWithoutSentByInput | Prisma.EmailLogUpdateWithWhereUniqueWithoutSentByInput[];
    updateMany?: Prisma.EmailLogUpdateManyWithWhereWithoutSentByInput | Prisma.EmailLogUpdateManyWithWhereWithoutSentByInput[];
    deleteMany?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
};
export type EnumRecipientTypeFieldUpdateOperationsInput = {
    set?: $Enums.RecipientType;
};
export type EmailLogCreateWithoutSentByInput = {
    id?: string;
    subject: string;
    body: string;
    recipientType: $Enums.RecipientType;
    categoryId?: string | null;
    recipientCount: number;
    sentAt?: Date | string;
};
export type EmailLogUncheckedCreateWithoutSentByInput = {
    id?: string;
    subject: string;
    body: string;
    recipientType: $Enums.RecipientType;
    categoryId?: string | null;
    recipientCount: number;
    sentAt?: Date | string;
};
export type EmailLogCreateOrConnectWithoutSentByInput = {
    where: Prisma.EmailLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailLogCreateWithoutSentByInput, Prisma.EmailLogUncheckedCreateWithoutSentByInput>;
};
export type EmailLogCreateManySentByInputEnvelope = {
    data: Prisma.EmailLogCreateManySentByInput | Prisma.EmailLogCreateManySentByInput[];
    skipDuplicates?: boolean;
};
export type EmailLogUpsertWithWhereUniqueWithoutSentByInput = {
    where: Prisma.EmailLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.EmailLogUpdateWithoutSentByInput, Prisma.EmailLogUncheckedUpdateWithoutSentByInput>;
    create: Prisma.XOR<Prisma.EmailLogCreateWithoutSentByInput, Prisma.EmailLogUncheckedCreateWithoutSentByInput>;
};
export type EmailLogUpdateWithWhereUniqueWithoutSentByInput = {
    where: Prisma.EmailLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.EmailLogUpdateWithoutSentByInput, Prisma.EmailLogUncheckedUpdateWithoutSentByInput>;
};
export type EmailLogUpdateManyWithWhereWithoutSentByInput = {
    where: Prisma.EmailLogScalarWhereInput;
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyWithoutSentByInput>;
};
export type EmailLogScalarWhereInput = {
    AND?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
    OR?: Prisma.EmailLogScalarWhereInput[];
    NOT?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[];
    id?: Prisma.StringFilter<"EmailLog"> | string;
    sentById?: Prisma.StringFilter<"EmailLog"> | string;
    subject?: Prisma.StringFilter<"EmailLog"> | string;
    body?: Prisma.StringFilter<"EmailLog"> | string;
    recipientType?: Prisma.EnumRecipientTypeFilter<"EmailLog"> | $Enums.RecipientType;
    categoryId?: Prisma.StringNullableFilter<"EmailLog"> | string | null;
    recipientCount?: Prisma.IntFilter<"EmailLog"> | number;
    sentAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string;
};
export type EmailLogCreateManySentByInput = {
    id?: string;
    subject: string;
    body: string;
    recipientType: $Enums.RecipientType;
    categoryId?: string | null;
    recipientCount: number;
    sentAt?: Date | string;
};
export type EmailLogUpdateWithoutSentByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientType?: Prisma.EnumRecipientTypeFieldUpdateOperationsInput | $Enums.RecipientType;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recipientCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogUncheckedUpdateWithoutSentByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientType?: Prisma.EnumRecipientTypeFieldUpdateOperationsInput | $Enums.RecipientType;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recipientCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogUncheckedUpdateManyWithoutSentByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    recipientType?: Prisma.EnumRecipientTypeFieldUpdateOperationsInput | $Enums.RecipientType;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recipientCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sentById?: boolean;
    subject?: boolean;
    body?: boolean;
    recipientType?: boolean;
    categoryId?: boolean;
    recipientCount?: boolean;
    sentAt?: boolean;
    sentBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailLog"]>;
export type EmailLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sentById?: boolean;
    subject?: boolean;
    body?: boolean;
    recipientType?: boolean;
    categoryId?: boolean;
    recipientCount?: boolean;
    sentAt?: boolean;
    sentBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailLog"]>;
export type EmailLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sentById?: boolean;
    subject?: boolean;
    body?: boolean;
    recipientType?: boolean;
    categoryId?: boolean;
    recipientCount?: boolean;
    sentAt?: boolean;
    sentBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailLog"]>;
export type EmailLogSelectScalar = {
    id?: boolean;
    sentById?: boolean;
    subject?: boolean;
    body?: boolean;
    recipientType?: boolean;
    categoryId?: boolean;
    recipientCount?: boolean;
    sentAt?: boolean;
};
export type EmailLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sentById" | "subject" | "body" | "recipientType" | "categoryId" | "recipientCount" | "sentAt", ExtArgs["result"]["emailLog"]>;
export type EmailLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sentBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EmailLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sentBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EmailLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sentBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $EmailLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EmailLog";
    objects: {
        sentBy: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sentById: string;
        subject: string;
        body: string;
        recipientType: $Enums.RecipientType;
        categoryId: string | null;
        recipientCount: number;
        sentAt: Date;
    }, ExtArgs["result"]["emailLog"]>;
    composites: {};
};
export type EmailLogGetPayload<S extends boolean | null | undefined | EmailLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailLogPayload, S>;
export type EmailLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmailLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailLogCountAggregateInputType | true;
};
export interface EmailLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EmailLog'];
        meta: {
            name: 'EmailLog';
        };
    };
    findUnique<T extends EmailLogFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmailLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmailLogFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmailLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmailLogFindManyArgs>(args?: Prisma.SelectSubset<T, EmailLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmailLogCreateArgs>(args: Prisma.SelectSubset<T, EmailLogCreateArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmailLogCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EmailLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmailLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EmailLogDeleteArgs>(args: Prisma.SelectSubset<T, EmailLogDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmailLogUpdateArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmailLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmailLogUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EmailLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EmailLogUpsertArgs>(args: Prisma.SelectSubset<T, EmailLogUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmailLogCountArgs>(args?: Prisma.Subset<T, EmailLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmailLogCountAggregateOutputType> : number>;
    aggregate<T extends EmailLogAggregateArgs>(args: Prisma.Subset<T, EmailLogAggregateArgs>): Prisma.PrismaPromise<GetEmailLogAggregateType<T>>;
    groupBy<T extends EmailLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmailLogGroupByArgs['orderBy'];
    } : {
        orderBy?: EmailLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmailLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmailLogFieldRefs;
}
export interface Prisma__EmailLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sentBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmailLogFieldRefs {
    readonly id: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly sentById: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly subject: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly body: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly recipientType: Prisma.FieldRef<"EmailLog", 'RecipientType'>;
    readonly categoryId: Prisma.FieldRef<"EmailLog", 'String'>;
    readonly recipientCount: Prisma.FieldRef<"EmailLog", 'Int'>;
    readonly sentAt: Prisma.FieldRef<"EmailLog", 'DateTime'>;
}
export type EmailLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[];
};
export type EmailLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[];
};
export type EmailLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where?: Prisma.EmailLogWhereInput;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[];
    cursor?: Prisma.EmailLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[];
};
export type EmailLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailLogCreateInput, Prisma.EmailLogUncheckedCreateInput>;
};
export type EmailLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmailLogCreateManyInput | Prisma.EmailLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmailLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    data: Prisma.EmailLogCreateManyInput | Prisma.EmailLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EmailLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EmailLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailLogUpdateInput, Prisma.EmailLogUncheckedUpdateInput>;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyInput>;
    where?: Prisma.EmailLogWhereInput;
    limit?: number;
};
export type EmailLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyInput>;
    where?: Prisma.EmailLogWhereInput;
    limit?: number;
    include?: Prisma.EmailLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EmailLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailLogCreateInput, Prisma.EmailLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmailLogUpdateInput, Prisma.EmailLogUncheckedUpdateInput>;
};
export type EmailLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
    where: Prisma.EmailLogWhereUniqueInput;
};
export type EmailLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput;
    limit?: number;
};
export type EmailLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null;
    omit?: Prisma.EmailLogOmit<ExtArgs> | null;
    include?: Prisma.EmailLogInclude<ExtArgs> | null;
};
