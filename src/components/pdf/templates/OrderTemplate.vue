<template>
  <div class="template-container">
    <div class="flex mb-4 font-bold justify-around">
      <h2 class="text-xl ">
        <span class="mr-2">{{ lang('OrderId') }}:</span>
        <span>{{ order.id }}</span>
      </h2>
      <h2 class="text-xl">
        <span class="mr-2">{{ lang('Date') }}: </span>
        <span>{{ new Date(order.date.toString()).toLocaleString() }}</span>
      </h2>
    </div>
    <table class="table  table-auto w-full text-left">
      <thead>
      <tr class="font-medium  uppercase border-b border-gray-200" :style="{color: headerColor}">
        <th v-for="(header) in headers" :key="header">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in order.items" :key="index" class="border-b border-gray-200"
          :style="{color: valueColor}">
        <td>{{ index + 1 }}</td>
        <td>
          <span class="ml-4">{{ item.product?.name || item.name }}</span>
        </td>
        <td>{{ item.quantity }}</td>
        <td class="flex justify-center"> ${{ formatPrice(item.price_per_unit) }}</td>
      </tr>
      </tbody>
    </table>
    <div class="flex mt-4 ml-auto justify-end font-bold mr-5">
      <h2 class="text-sm ">
        <span class="mr-2">{{ lang('TotalQuantity') }}:</span>
        {{ order.items.reduce((acc, item) => acc + item.quantity, 0) }}
      </h2>
      <h2 class="text-sm ml-2">
        <span class="ml-10 mr-2">{{ lang('TotalPrice') }}:</span>
        ${{ formatPrice(order.items.reduce((acc, item) => acc + item.price_per_unit, 0)) }}
      </h2>
    </div>

    <div class="flex mt-10 flex-col border-t-2 px-4">
      <h2 class="text-sm "><span class="mr-2 font-bold">{{ lang('CustomerName') }}:</span> {{ order.customer_name }}
      </h2>
      <h2 class="text-sm "><span class="mr-2 font-bold">{{ lang('CustomerAddress') }}:</span>
        {{ order.customer_address }}</h2>
    </div>
    <div style="margin-top: 550px; margin-left: 200px">Just for check Pagination</div>
  </div>
</template>

<script lang="ts" setup>
import type {OrderType} from "@/types/OrderTypes.js";
import {lang} from "@/locales/messages.js";
import {formatPrice} from "@/utils/helpers/number";

const headers: string[] = [
  lang('Name'),
  lang('Row'),
  lang('Quantity'),
  lang('PricePerUnit'),
]
defineProps<{ order: OrderType, headerColor?: string, valueColor?: string }>()
</script>

<style scoped>
html, body {
  font-size: 10px !important;
}

.template-container {
  font-size: 14px;
  width: 595px;
}

td, th {
  margin: 0 !important;
  padding: 0 !important;
  padding-bottom: 10px !important;
  text-align: center;
  vertical-align: top;
  height: auto;
  z-index: 99999 !important;
}

img {
  width: 5px !important;
  height: 5px !important;
}
</style>