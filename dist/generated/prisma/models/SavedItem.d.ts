import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type SavedItemModel = runtime.Types.Result.DefaultSelection<Prisma.$SavedItemPayload>;
export type AggregateSavedItem = {
    _count: SavedItemCountAggregateOutputType | null;
    _min: SavedItemMinAggregateOutputType | null;
    _max: SavedItemMaxAggregateOutputType | null;
};
export type SavedItemMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    productId: string | null;
    savedAt: Date | null;
};
export type SavedItemMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    productId: string | null;
    savedAt: Date | null;
};
export type SavedItemCountAggregateOutputType = {
    id: number;
    userId: number;
    productId: number;
    savedAt: number;
    _all: number;
};
export type SavedItemMinAggregateInputType = {
    id?: true;
    userId?: true;
    productId?: true;
    savedAt?: true;
};
export type SavedItemMaxAggregateInputType = {
    id?: true;
    userId?: true;
    productId?: true;
    savedAt?: true;
};
export type SavedItemCountAggregateInputType = {
    id?: true;
    userId?: true;
    productId?: true;
    savedAt?: true;
    _all?: true;
};
export type SavedItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SavedItemWhereInput;
    orderBy?: Prisma.SavedItemOrderByWithRelationInput | Prisma.SavedItemOrderByWithRelationInput[];
    cursor?: Prisma.SavedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SavedItemCountAggregateInputType;
    _min?: SavedItemMinAggregateInputType;
    _max?: SavedItemMaxAggregateInputType;
};
export type GetSavedItemAggregateType<T extends SavedItemAggregateArgs> = {
    [P in keyof T & keyof AggregateSavedItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSavedItem[P]> : Prisma.GetScalarType<T[P], AggregateSavedItem[P]>;
};
export type SavedItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SavedItemWhereInput;
    orderBy?: Prisma.SavedItemOrderByWithAggregationInput | Prisma.SavedItemOrderByWithAggregationInput[];
    by: Prisma.SavedItemScalarFieldEnum[] | Prisma.SavedItemScalarFieldEnum;
    having?: Prisma.SavedItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SavedItemCountAggregateInputType | true;
    _min?: SavedItemMinAggregateInputType;
    _max?: SavedItemMaxAggregateInputType;
};
export type SavedItemGroupByOutputType = {
    id: string;
    userId: string;
    productId: string;
    savedAt: Date;
    _count: SavedItemCountAggregateOutputType | null;
    _min: SavedItemMinAggregateOutputType | null;
    _max: SavedItemMaxAggregateOutputType | null;
};
export type GetSavedItemGroupByPayload<T extends SavedItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SavedItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SavedItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SavedItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SavedItemGroupByOutputType[P]>;
}>>;
export type SavedItemWhereInput = {
    AND?: Prisma.SavedItemWhereInput | Prisma.SavedItemWhereInput[];
    OR?: Prisma.SavedItemWhereInput[];
    NOT?: Prisma.SavedItemWhereInput | Prisma.SavedItemWhereInput[];
    id?: Prisma.StringFilter<"SavedItem"> | string;
    userId?: Prisma.StringFilter<"SavedItem"> | string;
    productId?: Prisma.StringFilter<"SavedItem"> | string;
    savedAt?: Prisma.DateTimeFilter<"SavedItem"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type SavedItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    savedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type SavedItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_productId?: Prisma.SavedItemUserIdProductIdCompoundUniqueInput;
    AND?: Prisma.SavedItemWhereInput | Prisma.SavedItemWhereInput[];
    OR?: Prisma.SavedItemWhereInput[];
    NOT?: Prisma.SavedItemWhereInput | Prisma.SavedItemWhereInput[];
    userId?: Prisma.StringFilter<"SavedItem"> | string;
    productId?: Prisma.StringFilter<"SavedItem"> | string;
    savedAt?: Prisma.DateTimeFilter<"SavedItem"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id" | "userId_productId">;
export type SavedItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    savedAt?: Prisma.SortOrder;
    _count?: Prisma.SavedItemCountOrderByAggregateInput;
    _max?: Prisma.SavedItemMaxOrderByAggregateInput;
    _min?: Prisma.SavedItemMinOrderByAggregateInput;
};
export type SavedItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.SavedItemScalarWhereWithAggregatesInput | Prisma.SavedItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.SavedItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SavedItemScalarWhereWithAggregatesInput | Prisma.SavedItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SavedItem"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"SavedItem"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"SavedItem"> | string;
    savedAt?: Prisma.DateTimeWithAggregatesFilter<"SavedItem"> | Date | string;
};
export type SavedItemCreateInput = {
    id?: string;
    savedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSavedInput;
    product: Prisma.ProductCreateNestedOneWithoutSavedInput;
};
export type SavedItemUncheckedCreateInput = {
    id?: string;
    userId: string;
    productId: string;
    savedAt?: Date | string;
};
export type SavedItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSavedNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutSavedNestedInput;
};
export type SavedItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedItemCreateManyInput = {
    id?: string;
    userId: string;
    productId: string;
    savedAt?: Date | string;
};
export type SavedItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedItemListRelationFilter = {
    every?: Prisma.SavedItemWhereInput;
    some?: Prisma.SavedItemWhereInput;
    none?: Prisma.SavedItemWhereInput;
};
export type SavedItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SavedItemUserIdProductIdCompoundUniqueInput = {
    userId: string;
    productId: string;
};
export type SavedItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    savedAt?: Prisma.SortOrder;
};
export type SavedItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    savedAt?: Prisma.SortOrder;
};
export type SavedItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    savedAt?: Prisma.SortOrder;
};
export type SavedItemCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutUserInput, Prisma.SavedItemUncheckedCreateWithoutUserInput> | Prisma.SavedItemCreateWithoutUserInput[] | Prisma.SavedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutUserInput | Prisma.SavedItemCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SavedItemCreateManyUserInputEnvelope;
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
};
export type SavedItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutUserInput, Prisma.SavedItemUncheckedCreateWithoutUserInput> | Prisma.SavedItemCreateWithoutUserInput[] | Prisma.SavedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutUserInput | Prisma.SavedItemCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SavedItemCreateManyUserInputEnvelope;
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
};
export type SavedItemUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutUserInput, Prisma.SavedItemUncheckedCreateWithoutUserInput> | Prisma.SavedItemCreateWithoutUserInput[] | Prisma.SavedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutUserInput | Prisma.SavedItemCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SavedItemUpsertWithWhereUniqueWithoutUserInput | Prisma.SavedItemUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SavedItemCreateManyUserInputEnvelope;
    set?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    disconnect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    delete?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    update?: Prisma.SavedItemUpdateWithWhereUniqueWithoutUserInput | Prisma.SavedItemUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SavedItemUpdateManyWithWhereWithoutUserInput | Prisma.SavedItemUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SavedItemScalarWhereInput | Prisma.SavedItemScalarWhereInput[];
};
export type SavedItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutUserInput, Prisma.SavedItemUncheckedCreateWithoutUserInput> | Prisma.SavedItemCreateWithoutUserInput[] | Prisma.SavedItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutUserInput | Prisma.SavedItemCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SavedItemUpsertWithWhereUniqueWithoutUserInput | Prisma.SavedItemUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SavedItemCreateManyUserInputEnvelope;
    set?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    disconnect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    delete?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    update?: Prisma.SavedItemUpdateWithWhereUniqueWithoutUserInput | Prisma.SavedItemUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SavedItemUpdateManyWithWhereWithoutUserInput | Prisma.SavedItemUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SavedItemScalarWhereInput | Prisma.SavedItemScalarWhereInput[];
};
export type SavedItemCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutProductInput, Prisma.SavedItemUncheckedCreateWithoutProductInput> | Prisma.SavedItemCreateWithoutProductInput[] | Prisma.SavedItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutProductInput | Prisma.SavedItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.SavedItemCreateManyProductInputEnvelope;
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
};
export type SavedItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutProductInput, Prisma.SavedItemUncheckedCreateWithoutProductInput> | Prisma.SavedItemCreateWithoutProductInput[] | Prisma.SavedItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutProductInput | Prisma.SavedItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.SavedItemCreateManyProductInputEnvelope;
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
};
export type SavedItemUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutProductInput, Prisma.SavedItemUncheckedCreateWithoutProductInput> | Prisma.SavedItemCreateWithoutProductInput[] | Prisma.SavedItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutProductInput | Prisma.SavedItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.SavedItemUpsertWithWhereUniqueWithoutProductInput | Prisma.SavedItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.SavedItemCreateManyProductInputEnvelope;
    set?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    disconnect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    delete?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    update?: Prisma.SavedItemUpdateWithWhereUniqueWithoutProductInput | Prisma.SavedItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.SavedItemUpdateManyWithWhereWithoutProductInput | Prisma.SavedItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.SavedItemScalarWhereInput | Prisma.SavedItemScalarWhereInput[];
};
export type SavedItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.SavedItemCreateWithoutProductInput, Prisma.SavedItemUncheckedCreateWithoutProductInput> | Prisma.SavedItemCreateWithoutProductInput[] | Prisma.SavedItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.SavedItemCreateOrConnectWithoutProductInput | Prisma.SavedItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.SavedItemUpsertWithWhereUniqueWithoutProductInput | Prisma.SavedItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.SavedItemCreateManyProductInputEnvelope;
    set?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    disconnect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    delete?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    connect?: Prisma.SavedItemWhereUniqueInput | Prisma.SavedItemWhereUniqueInput[];
    update?: Prisma.SavedItemUpdateWithWhereUniqueWithoutProductInput | Prisma.SavedItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.SavedItemUpdateManyWithWhereWithoutProductInput | Prisma.SavedItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.SavedItemScalarWhereInput | Prisma.SavedItemScalarWhereInput[];
};
export type SavedItemCreateWithoutUserInput = {
    id?: string;
    savedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutSavedInput;
};
export type SavedItemUncheckedCreateWithoutUserInput = {
    id?: string;
    productId: string;
    savedAt?: Date | string;
};
export type SavedItemCreateOrConnectWithoutUserInput = {
    where: Prisma.SavedItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.SavedItemCreateWithoutUserInput, Prisma.SavedItemUncheckedCreateWithoutUserInput>;
};
export type SavedItemCreateManyUserInputEnvelope = {
    data: Prisma.SavedItemCreateManyUserInput | Prisma.SavedItemCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SavedItemUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SavedItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.SavedItemUpdateWithoutUserInput, Prisma.SavedItemUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SavedItemCreateWithoutUserInput, Prisma.SavedItemUncheckedCreateWithoutUserInput>;
};
export type SavedItemUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SavedItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.SavedItemUpdateWithoutUserInput, Prisma.SavedItemUncheckedUpdateWithoutUserInput>;
};
export type SavedItemUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SavedItemScalarWhereInput;
    data: Prisma.XOR<Prisma.SavedItemUpdateManyMutationInput, Prisma.SavedItemUncheckedUpdateManyWithoutUserInput>;
};
export type SavedItemScalarWhereInput = {
    AND?: Prisma.SavedItemScalarWhereInput | Prisma.SavedItemScalarWhereInput[];
    OR?: Prisma.SavedItemScalarWhereInput[];
    NOT?: Prisma.SavedItemScalarWhereInput | Prisma.SavedItemScalarWhereInput[];
    id?: Prisma.StringFilter<"SavedItem"> | string;
    userId?: Prisma.StringFilter<"SavedItem"> | string;
    productId?: Prisma.StringFilter<"SavedItem"> | string;
    savedAt?: Prisma.DateTimeFilter<"SavedItem"> | Date | string;
};
export type SavedItemCreateWithoutProductInput = {
    id?: string;
    savedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSavedInput;
};
export type SavedItemUncheckedCreateWithoutProductInput = {
    id?: string;
    userId: string;
    savedAt?: Date | string;
};
export type SavedItemCreateOrConnectWithoutProductInput = {
    where: Prisma.SavedItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.SavedItemCreateWithoutProductInput, Prisma.SavedItemUncheckedCreateWithoutProductInput>;
};
export type SavedItemCreateManyProductInputEnvelope = {
    data: Prisma.SavedItemCreateManyProductInput | Prisma.SavedItemCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type SavedItemUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.SavedItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.SavedItemUpdateWithoutProductInput, Prisma.SavedItemUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.SavedItemCreateWithoutProductInput, Prisma.SavedItemUncheckedCreateWithoutProductInput>;
};
export type SavedItemUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.SavedItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.SavedItemUpdateWithoutProductInput, Prisma.SavedItemUncheckedUpdateWithoutProductInput>;
};
export type SavedItemUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.SavedItemScalarWhereInput;
    data: Prisma.XOR<Prisma.SavedItemUpdateManyMutationInput, Prisma.SavedItemUncheckedUpdateManyWithoutProductInput>;
};
export type SavedItemCreateManyUserInput = {
    id?: string;
    productId: string;
    savedAt?: Date | string;
};
export type SavedItemUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutSavedNestedInput;
};
export type SavedItemUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedItemUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedItemCreateManyProductInput = {
    id?: string;
    userId: string;
    savedAt?: Date | string;
};
export type SavedItemUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSavedNestedInput;
};
export type SavedItemUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedItemUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    savedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    productId?: boolean;
    savedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savedItem"]>;
export type SavedItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    productId?: boolean;
    savedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savedItem"]>;
export type SavedItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    productId?: boolean;
    savedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savedItem"]>;
export type SavedItemSelectScalar = {
    id?: boolean;
    userId?: boolean;
    productId?: boolean;
    savedAt?: boolean;
};
export type SavedItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "productId" | "savedAt", ExtArgs["result"]["savedItem"]>;
export type SavedItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type SavedItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type SavedItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $SavedItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SavedItem";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        productId: string;
        savedAt: Date;
    }, ExtArgs["result"]["savedItem"]>;
    composites: {};
};
export type SavedItemGetPayload<S extends boolean | null | undefined | SavedItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SavedItemPayload, S>;
export type SavedItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SavedItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SavedItemCountAggregateInputType | true;
};
export interface SavedItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SavedItem'];
        meta: {
            name: 'SavedItem';
        };
    };
    findUnique<T extends SavedItemFindUniqueArgs>(args: Prisma.SelectSubset<T, SavedItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SavedItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SavedItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SavedItemFindFirstArgs>(args?: Prisma.SelectSubset<T, SavedItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SavedItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SavedItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SavedItemFindManyArgs>(args?: Prisma.SelectSubset<T, SavedItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SavedItemCreateArgs>(args: Prisma.SelectSubset<T, SavedItemCreateArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SavedItemCreateManyArgs>(args?: Prisma.SelectSubset<T, SavedItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SavedItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SavedItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SavedItemDeleteArgs>(args: Prisma.SelectSubset<T, SavedItemDeleteArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SavedItemUpdateArgs>(args: Prisma.SelectSubset<T, SavedItemUpdateArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SavedItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, SavedItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SavedItemUpdateManyArgs>(args: Prisma.SelectSubset<T, SavedItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SavedItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SavedItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SavedItemUpsertArgs>(args: Prisma.SelectSubset<T, SavedItemUpsertArgs<ExtArgs>>): Prisma.Prisma__SavedItemClient<runtime.Types.Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SavedItemCountArgs>(args?: Prisma.Subset<T, SavedItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SavedItemCountAggregateOutputType> : number>;
    aggregate<T extends SavedItemAggregateArgs>(args: Prisma.Subset<T, SavedItemAggregateArgs>): Prisma.PrismaPromise<GetSavedItemAggregateType<T>>;
    groupBy<T extends SavedItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SavedItemGroupByArgs['orderBy'];
    } : {
        orderBy?: SavedItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SavedItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SavedItemFieldRefs;
}
export interface Prisma__SavedItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SavedItemFieldRefs {
    readonly id: Prisma.FieldRef<"SavedItem", 'String'>;
    readonly userId: Prisma.FieldRef<"SavedItem", 'String'>;
    readonly productId: Prisma.FieldRef<"SavedItem", 'String'>;
    readonly savedAt: Prisma.FieldRef<"SavedItem", 'DateTime'>;
}
export type SavedItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    where: Prisma.SavedItemWhereUniqueInput;
};
export type SavedItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    where: Prisma.SavedItemWhereUniqueInput;
};
export type SavedItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    where?: Prisma.SavedItemWhereInput;
    orderBy?: Prisma.SavedItemOrderByWithRelationInput | Prisma.SavedItemOrderByWithRelationInput[];
    cursor?: Prisma.SavedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SavedItemScalarFieldEnum | Prisma.SavedItemScalarFieldEnum[];
};
export type SavedItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    where?: Prisma.SavedItemWhereInput;
    orderBy?: Prisma.SavedItemOrderByWithRelationInput | Prisma.SavedItemOrderByWithRelationInput[];
    cursor?: Prisma.SavedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SavedItemScalarFieldEnum | Prisma.SavedItemScalarFieldEnum[];
};
export type SavedItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    where?: Prisma.SavedItemWhereInput;
    orderBy?: Prisma.SavedItemOrderByWithRelationInput | Prisma.SavedItemOrderByWithRelationInput[];
    cursor?: Prisma.SavedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SavedItemScalarFieldEnum | Prisma.SavedItemScalarFieldEnum[];
};
export type SavedItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SavedItemCreateInput, Prisma.SavedItemUncheckedCreateInput>;
};
export type SavedItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SavedItemCreateManyInput | Prisma.SavedItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SavedItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    data: Prisma.SavedItemCreateManyInput | Prisma.SavedItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SavedItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SavedItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SavedItemUpdateInput, Prisma.SavedItemUncheckedUpdateInput>;
    where: Prisma.SavedItemWhereUniqueInput;
};
export type SavedItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SavedItemUpdateManyMutationInput, Prisma.SavedItemUncheckedUpdateManyInput>;
    where?: Prisma.SavedItemWhereInput;
    limit?: number;
};
export type SavedItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SavedItemUpdateManyMutationInput, Prisma.SavedItemUncheckedUpdateManyInput>;
    where?: Prisma.SavedItemWhereInput;
    limit?: number;
    include?: Prisma.SavedItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SavedItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    where: Prisma.SavedItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.SavedItemCreateInput, Prisma.SavedItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SavedItemUpdateInput, Prisma.SavedItemUncheckedUpdateInput>;
};
export type SavedItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
    where: Prisma.SavedItemWhereUniqueInput;
};
export type SavedItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SavedItemWhereInput;
    limit?: number;
};
export type SavedItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SavedItemSelect<ExtArgs> | null;
    omit?: Prisma.SavedItemOmit<ExtArgs> | null;
    include?: Prisma.SavedItemInclude<ExtArgs> | null;
};
