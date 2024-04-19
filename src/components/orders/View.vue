<template>
  <main class="flex flex-col">
    <div v-if="order" class="flex items-start flex-col md:flex-row">
      <div class="w-full md:w-8/12 p-10 mr-4 bg-white border-2 rounded">
        <div class="flex flex-wrap justify-between">
          <TextInput name="customer_name" disabled v-model="order.customer_name"
                     class="w-full md:w-6/12" :label="lang('CustomerName')"/>
          <TextInput name="customer_address" disabled v-model="order.customer_address"
                     class="w-full mt-4 pl-2 md:mt-0 md:w-6/12" :label="lang('CustomerAddress')"/>
        </div>

        <DataTable :headers="headers" :items="order.items">
          <template v-slot:item.name="{item}: {item: OrderItemType}">
            <td class="w-full">
              <div class="flex items-center">
                <img :src="item.product?.image" :alt="lang('Image')" width="30">
                <span class="ml-4">{{ item.product?.name || item.name }}</span>
              </div>
            </td>
          </template>

          <template v-slot:item.price_per_unit="{item}: {item:OrderItemType}">
            <td class="flex justify-center"> ${{ formatPrice(item.price_per_unit) }}</td>
          </template>
        </DataTable>
      </div>
      <div class="w-full md:w-4/12 p-10 bg-white border-2 rounded md:mt-0 mt-4">
        <Extra :order="order"/>
      </div>
    </div>
    <img src="@/assets/images/loading.svg" class="p-20 m-auto" :alt="lang('Loading')" v-else/>
  </main>
</template>

<script lang="ts" setup>
import {lang} from "@/locales/messages";
import {onMounted, ref} from "vue";
import type {OrderItemType, OrderType} from "@/types/OrderTypes";
import {useOrderStore} from "@/stores/order";
import TextInput from "@/components/shared/TextInput.vue";
import DataTable from "@/components/shared/DataTable.vue";
import type {HeaderType} from "@/types/DataTableTypes";
import {formatPrice} from "@/utils/helpers/number";
import Extra from "@/components/orders/Extra.vue";

const headers: HeaderType[] = [
  {title: lang('Name'), value: 'name'},
  {title: lang('PricePerUnit'), value: 'price_per_unit'},
  {title: lang('Quantity'), value: 'quantity'},
]

const orderStore = useOrderStore()
const order = ref<OrderType>()

const props = defineProps<{ id: string }>()

onMounted(() => {
  orderStore.show(props.id).then((r : OrderType)=> {
    order.value = r
  })
})
</script>