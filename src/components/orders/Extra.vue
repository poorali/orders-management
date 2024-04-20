<template>
  <div class="flex mt-4">
    <InfoCard class="w-32" :title="lang('Items')" :value="order.items.length" color="red-500"/>
    <InfoCard class="w-32 ml-2" :title="lang('TotalPrice')" :value="'$'+formatPrice(order.items.reduce((acc, item) => acc + item.price_per_unit, 0))" color="blue-600"/>
    <InfoCard class="w-32 ml-2" :title="lang('TotalQuantity')" :value="order.items.reduce((acc, item) => acc + item.quantity, 0)" color="blue-300"/>
  </div>
</template>

<script lang="ts" setup>
import type {OrderType} from "@/types/OrderTypes";
import InfoCard from "@/components/shared/InfoCard.vue";
import {lang} from "@/locales/messages";
import {formatPrice} from "@/utils/helpers/number";
const props = defineProps<{order: OrderType}>()
</script>