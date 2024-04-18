<template>
  <CustomButton size="small" @click="() => router.push({name: 'OrdersView', params: {id: item.id}})" variant="outlined" class="hover:bg-blue-100 mr-2">
    <img src="@/assets/icons/view.svg" width="18" :alt="lang('OrdersView')"/>
  </CustomButton>
  <CustomButton size="small" @click="() => router.push({name: 'OrdersEdit', params: {id: item.id}})" variant="outlined" class="hover:bg-blue-100">
    <img src="@/assets/icons/edit.svg" width="18" :alt="lang('OrdersEdit')"/>
  </CustomButton>
</template>

<script setup lang="ts">
import {lang} from "@/locales/messages";
import CustomButton from "@/components/shared/CustomButton.vue";
import type {OrderType} from "@/types/OrderTypes";;
import {useRouter} from "vue-router";
const router = useRouter()
defineProps<{item: OrderType}>()
</script>