<template>
  <CustomButton v-if="router.currentRoute.value.name !== 'OrdersView'" size="small" @click="() => router.push({name: 'OrdersView', params: {id: item.id}})" variant="outlined" class="hover:bg-blue-100 mr-2">
    <img src="@/assets/icons/view.svg" width="18" :alt="lang('OrdersView')"/>
  </CustomButton>
  <CustomButton size="small" @click="() => router.push({name: 'OrdersEdit', params: {id: item.id}})" variant="outlined" class="hover:bg-blue-100 mr-2">
    <img src="@/assets/icons/edit.svg" width="18" :alt="lang('OrdersEdit')"/>
  </CustomButton>
  <CustomButton size="small" :loading="isDeleting" @click="deleteOrder" variant="outlined" class="hover:bg-blue-100">
    <img src="@/assets/icons/delete.svg" width="18" :alt="lang('OrdersDelete')"/>
  </CustomButton>
</template>

<script setup lang="ts">
import {lang} from "@/locales/messages";
import CustomButton from "@/components/shared/CustomButton.vue";
import type {OrderType} from "@/types/OrderTypes";
import {useRouter} from "vue-router";
import {useOrderStore} from "@/stores/order";
import {ref} from "vue";
const router = useRouter()
const props = defineProps<{item: OrderType}>()
const orderStore = useOrderStore()
const isDeleting = ref(false)
const deleteOrder = async() =>{
  if(confirm(lang('DeleteConfirm')) && props.item.id){
    isDeleting.value = true
    await orderStore.remove(props.item.id)
        .then(r => {
          if(r.message){
            orderStore.message = r.message
          }
          router.push({name: 'Orders'})
        })
        .finally(() => isDeleting.value = false)
  }
}
</script>