import {defineStore} from "pinia";
import useAxios from "@/plugins/axios";
import type {OrderCreateType, OrderListType, OrderType} from "@/types/OrderTypes";
import type {EndpointResponseType} from "@/types/ServiceTypes";

const {service} = useAxios({});

const baseUrl = `/orders`;
export const useOrderStore = defineStore('order', {
    state: () => ({
        message: <string>''
    }),
    actions: {
        async getList(page: number = 1, search: String) {
            const {data}: { data: OrderListType } = await service.get(baseUrl, {
                params: {search, page}
            })

            if (data.status === 'error') {
                throw data.errors
            }
            return data;
        },
        async create(order: object) {
            const {data}: { data: OrderCreateType } = await service.post(baseUrl + '/create',{...order})

            if (data.status === 'error') {
                throw data.errors
            }
            return data;
        },
        async edit(id: number,order: object) {
            const {data}: { data: OrderCreateType } = await service.post(baseUrl + '/edit/' + id,{...order})

            if (data.status === 'error') {
                throw data.errors
            }
            return data;
        },
        async show(id: string) {
            const {data}: { data: EndpointResponseType & { order: OrderType } } = await service.get(baseUrl + '/' + id)

            if (data.status === 'error') {
                throw data.errors
            }
            return data.order
        },
        async remove(id: number) {
            const {data}: { data: EndpointResponseType & { order: OrderType } } = await service.delete(baseUrl + '/' + id)

            if (data.status === 'error') {
                throw data.errors
            }
            return data
        },
    }
})