<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/breadcrumb/Base.vue";
import {lang} from "@/locales/messages";
import {ref} from "vue";
import router from "@/plugins/router";
import OrderInvoice from "@/components/orders/Invoice.vue"
const breadcrumbs = ref([
  {
    title: lang('SuperAdmin'),
    disabled: false,
    to: '/'
  },
  {
    title: lang('Orders'),
    disabled: false,
    to: '/'
  },
  {
    title: lang('Invoice'),
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <div>
    <base-breadcrumb :title="lang('OrdersViewDescription')" :breadcrumbs="breadcrumbs"></base-breadcrumb>
    <OrderInvoice :id="router.currentRoute.value.params.id.toString()"/>
  </div>
</template>
