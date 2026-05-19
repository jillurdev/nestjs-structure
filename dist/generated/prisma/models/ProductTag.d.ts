import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProductTagModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductTagPayload>;
export type AggregateProductTag = {
    _count: ProductTagCountAggregateOutputType | null;
    _min: ProductTagMinAggregateOutputType | null;
    _max: ProductTagMaxAggregateOutputType | null;
};
export type ProductTagMinAggregateOutputType = {
    productId: string | null;
    tagId: string | null;
};
export type ProductTagMaxAggregateOutputType = {
    productId: string | null;
    tagId: string | null;
};
export type ProductTagCountAggregateOutputType = {
    productId: number;
    tagId: number;
    _all: number;
};
export type ProductTagMinAggregateInputType = {
    productId?: true;
    tagId?: true;
};
export type ProductTagMaxAggregateInputType = {
    productId?: true;
    tagId?: true;
};
export type ProductTagCountAggregateInputType = {
    productId?: true;
    tagId?: true;
    _all?: true;
};
export type ProductTagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductTagWhereInput;
    orderBy?: Prisma.ProductTagOrderByWithRelationInput | Prisma.ProductTagOrderByWithRelationInput[];
    cursor?: Prisma.ProductTagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductTagCountAggregateInputType;
    _min?: ProductTagMinAggregateInputType;
    _max?: ProductTagMaxAggregateInputType;
};
export type GetProductTagAggregateType<T extends ProductTagAggregateArgs> = {
    [P in keyof T & keyof AggregateProductTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductTag[P]> : Prisma.GetScalarType<T[P], AggregateProductTag[P]>;
};
export type ProductTagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductTagWhereInput;
    orderBy?: Prisma.ProductTagOrderByWithAggregationInput | Prisma.ProductTagOrderByWithAggregationInput[];
    by: Prisma.ProductTagScalarFieldEnum[] | Prisma.ProductTagScalarFieldEnum;
    having?: Prisma.ProductTagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductTagCountAggregateInputType | true;
    _min?: ProductTagMinAggregateInputType;
    _max?: ProductTagMaxAggregateInputType;
};
export type ProductTagGroupByOutputType = {
    productId: string;
    tagId: string;
    _count: ProductTagCountAggregateOutputType | null;
    _min: ProductTagMinAggregateOutputType | null;
    _max: ProductTagMaxAggregateOutputType | null;
};
export type GetProductTagGroupByPayload<T extends ProductTagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductTagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductTagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductTagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductTagGroupByOutputType[P]>;
}>>;
export type ProductTagWhereInput = {
    AND?: Prisma.ProductTagWhereInput | Prisma.ProductTagWhereInput[];
    OR?: Prisma.ProductTagWhereInput[];
    NOT?: Prisma.ProductTagWhereInput | Prisma.ProductTagWhereInput[];
    productId?: Prisma.StringFilter<"ProductTag"> | string;
    tagId?: Prisma.StringFilter<"ProductTag"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
};
export type ProductTagOrderByWithRelationInput = {
    productId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    tag?: Prisma.TagOrderByWithRelationInput;
};
export type ProductTagWhereUniqueInput = Prisma.AtLeast<{
    productId_tagId?: Prisma.ProductTagProductIdTagIdCompoundUniqueInput;
    AND?: Prisma.ProductTagWhereInput | Prisma.ProductTagWhereInput[];
    OR?: Prisma.ProductTagWhereInput[];
    NOT?: Prisma.ProductTagWhereInput | Prisma.ProductTagWhereInput[];
    productId?: Prisma.StringFilter<"ProductTag"> | string;
    tagId?: Prisma.StringFilter<"ProductTag"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
}, "productId_tagId">;
export type ProductTagOrderByWithAggregationInput = {
    productId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    _count?: Prisma.ProductTagCountOrderByAggregateInput;
    _max?: Prisma.ProductTagMaxOrderByAggregateInput;
    _min?: Prisma.ProductTagMinOrderByAggregateInput;
};
export type ProductTagScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductTagScalarWhereWithAggregatesInput | Prisma.ProductTagScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductTagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductTagScalarWhereWithAggregatesInput | Prisma.ProductTagScalarWhereWithAggregatesInput[];
    productId?: Prisma.StringWithAggregatesFilter<"ProductTag"> | string;
    tagId?: Prisma.StringWithAggregatesFilter<"ProductTag"> | string;
};
export type ProductTagCreateInput = {
    product: Prisma.ProductCreateNestedOneWithoutTagsInput;
    tag: Prisma.TagCreateNestedOneWithoutProductsInput;
};
export type ProductTagUncheckedCreateInput = {
    productId: string;
    tagId: string;
};
export type ProductTagUpdateInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutTagsNestedInput;
    tag?: Prisma.TagUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductTagUncheckedUpdateInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductTagCreateManyInput = {
    productId: string;
    tagId: string;
};
export type ProductTagUpdateManyMutationInput = {};
export type ProductTagUncheckedUpdateManyInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductTagListRelationFilter = {
    every?: Prisma.ProductTagWhereInput;
    some?: Prisma.ProductTagWhereInput;
    none?: Prisma.ProductTagWhereInput;
};
export type ProductTagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductTagProductIdTagIdCompoundUniqueInput = {
    productId: string;
    tagId: string;
};
export type ProductTagCountOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type ProductTagMaxOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type ProductTagMinOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
};
export type ProductTagCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutTagInput, Prisma.ProductTagUncheckedCreateWithoutTagInput> | Prisma.ProductTagCreateWithoutTagInput[] | Prisma.ProductTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutTagInput | Prisma.ProductTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.ProductTagCreateManyTagInputEnvelope;
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
};
export type ProductTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutTagInput, Prisma.ProductTagUncheckedCreateWithoutTagInput> | Prisma.ProductTagCreateWithoutTagInput[] | Prisma.ProductTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutTagInput | Prisma.ProductTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.ProductTagCreateManyTagInputEnvelope;
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
};
export type ProductTagUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutTagInput, Prisma.ProductTagUncheckedCreateWithoutTagInput> | Prisma.ProductTagCreateWithoutTagInput[] | Prisma.ProductTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutTagInput | Prisma.ProductTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.ProductTagUpsertWithWhereUniqueWithoutTagInput | Prisma.ProductTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.ProductTagCreateManyTagInputEnvelope;
    set?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    disconnect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    delete?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    update?: Prisma.ProductTagUpdateWithWhereUniqueWithoutTagInput | Prisma.ProductTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.ProductTagUpdateManyWithWhereWithoutTagInput | Prisma.ProductTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.ProductTagScalarWhereInput | Prisma.ProductTagScalarWhereInput[];
};
export type ProductTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutTagInput, Prisma.ProductTagUncheckedCreateWithoutTagInput> | Prisma.ProductTagCreateWithoutTagInput[] | Prisma.ProductTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutTagInput | Prisma.ProductTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.ProductTagUpsertWithWhereUniqueWithoutTagInput | Prisma.ProductTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.ProductTagCreateManyTagInputEnvelope;
    set?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    disconnect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    delete?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    update?: Prisma.ProductTagUpdateWithWhereUniqueWithoutTagInput | Prisma.ProductTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.ProductTagUpdateManyWithWhereWithoutTagInput | Prisma.ProductTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.ProductTagScalarWhereInput | Prisma.ProductTagScalarWhereInput[];
};
export type ProductTagCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutProductInput, Prisma.ProductTagUncheckedCreateWithoutProductInput> | Prisma.ProductTagCreateWithoutProductInput[] | Prisma.ProductTagUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutProductInput | Prisma.ProductTagCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductTagCreateManyProductInputEnvelope;
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
};
export type ProductTagUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutProductInput, Prisma.ProductTagUncheckedCreateWithoutProductInput> | Prisma.ProductTagCreateWithoutProductInput[] | Prisma.ProductTagUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutProductInput | Prisma.ProductTagCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductTagCreateManyProductInputEnvelope;
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
};
export type ProductTagUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutProductInput, Prisma.ProductTagUncheckedCreateWithoutProductInput> | Prisma.ProductTagCreateWithoutProductInput[] | Prisma.ProductTagUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutProductInput | Prisma.ProductTagCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductTagUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductTagUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductTagCreateManyProductInputEnvelope;
    set?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    disconnect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    delete?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    update?: Prisma.ProductTagUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductTagUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductTagUpdateManyWithWhereWithoutProductInput | Prisma.ProductTagUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductTagScalarWhereInput | Prisma.ProductTagScalarWhereInput[];
};
export type ProductTagUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductTagCreateWithoutProductInput, Prisma.ProductTagUncheckedCreateWithoutProductInput> | Prisma.ProductTagCreateWithoutProductInput[] | Prisma.ProductTagUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductTagCreateOrConnectWithoutProductInput | Prisma.ProductTagCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductTagUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductTagUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductTagCreateManyProductInputEnvelope;
    set?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    disconnect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    delete?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    connect?: Prisma.ProductTagWhereUniqueInput | Prisma.ProductTagWhereUniqueInput[];
    update?: Prisma.ProductTagUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductTagUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductTagUpdateManyWithWhereWithoutProductInput | Prisma.ProductTagUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductTagScalarWhereInput | Prisma.ProductTagScalarWhereInput[];
};
export type ProductTagCreateWithoutTagInput = {
    product: Prisma.ProductCreateNestedOneWithoutTagsInput;
};
export type ProductTagUncheckedCreateWithoutTagInput = {
    productId: string;
};
export type ProductTagCreateOrConnectWithoutTagInput = {
    where: Prisma.ProductTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductTagCreateWithoutTagInput, Prisma.ProductTagUncheckedCreateWithoutTagInput>;
};
export type ProductTagCreateManyTagInputEnvelope = {
    data: Prisma.ProductTagCreateManyTagInput | Prisma.ProductTagCreateManyTagInput[];
    skipDuplicates?: boolean;
};
export type ProductTagUpsertWithWhereUniqueWithoutTagInput = {
    where: Prisma.ProductTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductTagUpdateWithoutTagInput, Prisma.ProductTagUncheckedUpdateWithoutTagInput>;
    create: Prisma.XOR<Prisma.ProductTagCreateWithoutTagInput, Prisma.ProductTagUncheckedCreateWithoutTagInput>;
};
export type ProductTagUpdateWithWhereUniqueWithoutTagInput = {
    where: Prisma.ProductTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductTagUpdateWithoutTagInput, Prisma.ProductTagUncheckedUpdateWithoutTagInput>;
};
export type ProductTagUpdateManyWithWhereWithoutTagInput = {
    where: Prisma.ProductTagScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductTagUpdateManyMutationInput, Prisma.ProductTagUncheckedUpdateManyWithoutTagInput>;
};
export type ProductTagScalarWhereInput = {
    AND?: Prisma.ProductTagScalarWhereInput | Prisma.ProductTagScalarWhereInput[];
    OR?: Prisma.ProductTagScalarWhereInput[];
    NOT?: Prisma.ProductTagScalarWhereInput | Prisma.ProductTagScalarWhereInput[];
    productId?: Prisma.StringFilter<"ProductTag"> | string;
    tagId?: Prisma.StringFilter<"ProductTag"> | string;
};
export type ProductTagCreateWithoutProductInput = {
    tag: Prisma.TagCreateNestedOneWithoutProductsInput;
};
export type ProductTagUncheckedCreateWithoutProductInput = {
    tagId: string;
};
export type ProductTagCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductTagCreateWithoutProductInput, Prisma.ProductTagUncheckedCreateWithoutProductInput>;
};
export type ProductTagCreateManyProductInputEnvelope = {
    data: Prisma.ProductTagCreateManyProductInput | Prisma.ProductTagCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductTagUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductTagUpdateWithoutProductInput, Prisma.ProductTagUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductTagCreateWithoutProductInput, Prisma.ProductTagUncheckedCreateWithoutProductInput>;
};
export type ProductTagUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductTagUpdateWithoutProductInput, Prisma.ProductTagUncheckedUpdateWithoutProductInput>;
};
export type ProductTagUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductTagScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductTagUpdateManyMutationInput, Prisma.ProductTagUncheckedUpdateManyWithoutProductInput>;
};
export type ProductTagCreateManyTagInput = {
    productId: string;
};
export type ProductTagUpdateWithoutTagInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutTagsNestedInput;
};
export type ProductTagUncheckedUpdateWithoutTagInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductTagUncheckedUpdateManyWithoutTagInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductTagCreateManyProductInput = {
    tagId: string;
};
export type ProductTagUpdateWithoutProductInput = {
    tag?: Prisma.TagUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductTagUncheckedUpdateWithoutProductInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductTagUncheckedUpdateManyWithoutProductInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductTagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    tagId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productTag"]>;
export type ProductTagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    tagId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productTag"]>;
export type ProductTagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    tagId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productTag"]>;
export type ProductTagSelectScalar = {
    productId?: boolean;
    tagId?: boolean;
};
export type ProductTagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"productId" | "tagId", ExtArgs["result"]["productTag"]>;
export type ProductTagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type ProductTagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type ProductTagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type $ProductTagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductTag";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        tag: Prisma.$TagPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        productId: string;
        tagId: string;
    }, ExtArgs["result"]["productTag"]>;
    composites: {};
};
export type ProductTagGetPayload<S extends boolean | null | undefined | ProductTagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductTagPayload, S>;
export type ProductTagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductTagCountAggregateInputType | true;
};
export interface ProductTagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductTag'];
        meta: {
            name: 'ProductTag';
        };
    };
    findUnique<T extends ProductTagFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductTagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductTagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductTagFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductTagFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductTagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductTagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductTagFindManyArgs>(args?: Prisma.SelectSubset<T, ProductTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductTagCreateArgs>(args: Prisma.SelectSubset<T, ProductTagCreateArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductTagCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductTagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductTagDeleteArgs>(args: Prisma.SelectSubset<T, ProductTagDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductTagUpdateArgs>(args: Prisma.SelectSubset<T, ProductTagUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductTagDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductTagUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductTagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductTagUpsertArgs>(args: Prisma.SelectSubset<T, ProductTagUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductTagClient<runtime.Types.Result.GetResult<Prisma.$ProductTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductTagCountArgs>(args?: Prisma.Subset<T, ProductTagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductTagCountAggregateOutputType> : number>;
    aggregate<T extends ProductTagAggregateArgs>(args: Prisma.Subset<T, ProductTagAggregateArgs>): Prisma.PrismaPromise<GetProductTagAggregateType<T>>;
    groupBy<T extends ProductTagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductTagGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductTagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductTagFieldRefs;
}
export interface Prisma__ProductTagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tag<T extends Prisma.TagDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TagDefaultArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductTagFieldRefs {
    readonly productId: Prisma.FieldRef<"ProductTag", 'String'>;
    readonly tagId: Prisma.FieldRef<"ProductTag", 'String'>;
}
export type ProductTagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    where: Prisma.ProductTagWhereUniqueInput;
};
export type ProductTagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    where: Prisma.ProductTagWhereUniqueInput;
};
export type ProductTagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    where?: Prisma.ProductTagWhereInput;
    orderBy?: Prisma.ProductTagOrderByWithRelationInput | Prisma.ProductTagOrderByWithRelationInput[];
    cursor?: Prisma.ProductTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductTagScalarFieldEnum | Prisma.ProductTagScalarFieldEnum[];
};
export type ProductTagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    where?: Prisma.ProductTagWhereInput;
    orderBy?: Prisma.ProductTagOrderByWithRelationInput | Prisma.ProductTagOrderByWithRelationInput[];
    cursor?: Prisma.ProductTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductTagScalarFieldEnum | Prisma.ProductTagScalarFieldEnum[];
};
export type ProductTagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    where?: Prisma.ProductTagWhereInput;
    orderBy?: Prisma.ProductTagOrderByWithRelationInput | Prisma.ProductTagOrderByWithRelationInput[];
    cursor?: Prisma.ProductTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductTagScalarFieldEnum | Prisma.ProductTagScalarFieldEnum[];
};
export type ProductTagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductTagCreateInput, Prisma.ProductTagUncheckedCreateInput>;
};
export type ProductTagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductTagCreateManyInput | Prisma.ProductTagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductTagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    data: Prisma.ProductTagCreateManyInput | Prisma.ProductTagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductTagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductTagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductTagUpdateInput, Prisma.ProductTagUncheckedUpdateInput>;
    where: Prisma.ProductTagWhereUniqueInput;
};
export type ProductTagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductTagUpdateManyMutationInput, Prisma.ProductTagUncheckedUpdateManyInput>;
    where?: Prisma.ProductTagWhereInput;
    limit?: number;
};
export type ProductTagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductTagUpdateManyMutationInput, Prisma.ProductTagUncheckedUpdateManyInput>;
    where?: Prisma.ProductTagWhereInput;
    limit?: number;
    include?: Prisma.ProductTagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductTagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    where: Prisma.ProductTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductTagCreateInput, Prisma.ProductTagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductTagUpdateInput, Prisma.ProductTagUncheckedUpdateInput>;
};
export type ProductTagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
    where: Prisma.ProductTagWhereUniqueInput;
};
export type ProductTagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductTagWhereInput;
    limit?: number;
};
export type ProductTagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductTagSelect<ExtArgs> | null;
    omit?: Prisma.ProductTagOmit<ExtArgs> | null;
    include?: Prisma.ProductTagInclude<ExtArgs> | null;
};
