import type {EndpointResponsePaginateType} from "@/types/ServiceTypes";
import type {ProductType} from "@/types/ProductTypes";

type OrderType =  {
    id?: number;
    customer_name: string;
    customer_address: string;
    is_deleted?: boolean;
    date: Date;
    items: OrderItemType[];
}

// OrderItem.ts
type OrderItemType =  {
    id?: number;
    order_id?: number;
    product_id: number;
    quantity: number;
    price_per_unit: number;
    name?: string;
    product?: ProductType
}

type OrderItemFormType = OrderItemType & {image? :string}

type OrderListType = EndpointResponsePaginateType & {orders: OrderType[]}
type OrderCreateType = EndpointResponsePaginateType & {order: OrderType}
export type {OrderListType, OrderType, OrderItemType, OrderCreateType, OrderItemFormType}