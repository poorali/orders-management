import type {EndpointResponsePaginateType} from "@/types/ServiceTypes";
type ProductType = {
    id: number,
    title: string;
    name: string;
    stock: number;
    price: number;
    image?: string;
}

type ProductListType = EndpointResponsePaginateType & {products: ProductType[]}

export type {ProductType, ProductListType}