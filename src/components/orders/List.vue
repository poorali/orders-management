<template>
  <main class="bg-white p-5 border-2 rounded h-96 flex flex-col">
    <TextInput name="search" v-model="search" debounce-delay="500" :placeholder="lang('SearchOrder')"/>
    <DataTable class="h-full" :headers="headers" :loading="loading" :items="list">
      <template v-slot:item.row="{index}">
        <td>{{ generateRowNumber(paginate, index) }}</td>
      </template>
      <template v-slot:item.items="{item}: {item:OrderType}">
        <td>{{ item.items.length }}</td>
      </template>
      <template v-slot:item.date="{item}: {item:OrderType}">
        <td>{{ new Date(item.date.toString()).toLocaleString() }}</td>
      </template>
      <template v-slot:item.actions="{item}: {item: OrderType}">
        <Actions :item="item"/>
      </template>
      <template v-slot:bottom>
        <Pagination :last-page="paginate.lastPage" class="mt-auto" v-model="paginate.currentPage"/>
      </template>
    </DataTable>
  </main>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import type {PaginateType} from "@/types/ServiceTypes";
import {lang} from "@/locales/messages";
import {debounce} from "@/utils/helpers/debounce";
import config from "@/config";
import type {OrderType} from "@/types/OrderTypes";
import {useOrderStore} from "@/stores/order";
import TextInput from "@/components/shared/TextInput.vue";
import DataTable from "@/components/shared/DataTable.vue";
import type {HeaderType} from "@/types/DataTableTypes";
import Pagination from "@/components/shared/Pagination.vue";
import {generateRowNumber} from "@/utils/helpers/pagination";
import Actions from "@/components/orders/Actions.vue";
import {push} from "@/utils/helpers/url";
import router from "@/plugins/router";

const loading = ref(false)
///toDO: Must refactor this initial state part
const search = ref<String>(router.currentRoute.value?.query.search?.toString() || '')
let paginate = ref<PaginateType>({
  currentPage: parseInt(router.currentRoute.value?.query.page?.toString() || config.defaultPaginate.currentPage.toString()),
  perPage: config.defaultPaginate.perPage, lastPage:config.defaultPaginate.lastPage
})
const list = ref<OrderType[]>([])
const orderStore = useOrderStore()
const headers: HeaderType[] = [
  {title: lang('Row'), value: 'row'},
  {title: lang('OrderId'), value: 'id'},
  {title: lang('CustomerName'), value: 'customer_name'},
  {title: lang('Date'), value: 'date'},
  {title: lang('Items'), value: 'items'},
  {title: lang('Actions'), value: 'actions'},
]

onMounted(() => {
  getList()
})
const getList = () => {
  loading.value = true
  orderStore.getList(paginate.value.currentPage, search.value).then(response => {
    loading.value = false
    list.value = response.orders
    paginate.value.lastPage = response.pagination.lastPage;
    paginate.value.perPage = response.pagination.perPage;
  })
}

const updateRoute = () => {
  const query: {page?: string, search?: string} = {}
  if(search.value.length !== 0){
    query.search = search.value.toString()
  }
  if(paginate.value.currentPage > 1){
    query.page = paginate.value.currentPage.toString()
  }
  push('Orders', query)

}
const updateSearch = (value: string) => {
  paginate.value.currentPage = 1
  updateRoute()
  if (value.length > 2 || value.length === 0) {
    getList()
  }
}

watch(search, debounce(updateSearch, 500))
watch(() => paginate.value.currentPage, () => {
  updateRoute()
  getList()
})
</script>