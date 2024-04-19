import {defineStore} from "pinia";
import useAxios from "@/plugins/axios";
import type {ProductListType, ProductType} from "@/types/ProductTypes";
const {service} = useAxios({});

const baseUrl = `/products`;
export const useProductStore = defineStore('product', {
    state: () => ({
        products: <ProductType[]>[]
    }),
    actions: {
        async getList(page: number = 1, search: String = '') {
            const {data}: { data: ProductListType } = await service.get(baseUrl, {
                params: {search, page}
            })

            if (data.status === 'error') {
                throw data.errors
            }
            this.products = data.products
            return data;
        },
    }
})