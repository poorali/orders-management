import type {EndpointResponsePaginateType} from "@/types/ServiceTypes";

type OrderType =  {
    id: number;
    customer_name: string;
    customer_address: string;
    is_deleted: boolean;
    date: Date;
    items: OrderItemType[];
}

// OrderItem.ts
type OrderItemType =  {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price_per_unit: number;
}

type OrderListType = EndpointResponsePaginateType & {orders: OrderType[]}
export type {OrderListType, OrderType, OrderItemType}