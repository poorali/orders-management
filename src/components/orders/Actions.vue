<template>
  <CustomButton v-if="router.currentRoute.value.name !== 'OrdersView'" size="small" @click="() => router.push({name: 'OrdersView', params: {id: item.id}})" variant="outlined" class="hover:bg-blue-100 mr-2">
    <img src="@/assets/icons/view.svg" width="18" :alt="lang('OrdersView')"/>
  </CustomButton>
  <CustomButton size="small" @click="() => router.push({name: 'OrdersEdit', params: {id: item.id}})" variant="outlined" class="hover:bg-blue-100 mr-2">
    <img src="@/assets/icons/edit.svg" width="18" :alt="lang('OrdersEdit')"/>
  </CustomButton>
  <CustomButton size="small" :loading="isDeleting" @click="deleteOrder" variant="outlined" class="hover:bg-blue-100 mr-2">
    <img src="@/assets/icons/delete.svg" width="18" :alt="lang('OrdersDelete')"/>
  </CustomButton>
  <CustomButton size="small"  @click="() => router.push({name: 'OrdersInvoice', params: {id: item.id}})" variant="outlined" class="hover:bg-blue-100">
    <img src="@/assets/icons/pdf.svg" width="18" :alt="lang('Invoice')"/>
  </CustomButton>
</template>

<script setup lang="ts">
import {lang} from "@/locales/messages";
import CustomButton from "@/components/shared/CustomButton.vue";
import type {OrderType} from "@/types/OrderTypes";
import {useRouter} from "vue-router";
import {useOrderStore} from "@/stores/order";
import {h, ref, render} from "vue";
import BlankTemplate from "@/components/pdf/templates/OrderTemplate.vue";
import {jsPDF} from "jspdf";
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
const printOrder = () =>{
  const div = document.createElement('div');
  div.style.fontSize= "10px"
  render(h(BlankTemplate, { order: props.item}), div);
  console.log(div.innerHTML)
  const doc = new jsPDF('p','pt','a4');
  doc.html(div.innerHTML, {callback: (doc) => {
      const blob = new Blob([doc.output()],{ type: 'application/pdf' })
      const pdfUrl = URL.createObjectURL(blob);
      window.location.href = pdfUrl
    }})
}
</script>