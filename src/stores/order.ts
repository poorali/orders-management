import {defineStore} from "pinia";
import useAxios from "@/plugins/axios";
import type {OrderCreateType, OrderListType, OrderType} from "@/types/OrderTypes";

const {service} = useAxios({});

const baseUrl = `/orders`;
export const useOrderStore = defineStore('order', {
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
    }
})