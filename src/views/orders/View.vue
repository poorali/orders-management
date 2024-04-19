<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/breadcrumb/Base.vue";
import {lang} from "@/locales/messages";
import {ref} from "vue";
import router from "@/plugins/router";
import OrderView from "@/components/orders/View.vue"
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
    title: lang('OrdersView'),
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <div>
    <base-breadcrumb :title="lang('OrdersViewDescription')" :breadcrumbs="breadcrumbs"></base-breadcrumb>
    <OrderView :id="router.currentRoute.value.params.id"/>
  </div>
</template>
