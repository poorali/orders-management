<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/breadcrumb/Base.vue";
import {lang} from "@/locales/messages";
import {ref} from "vue";
import OrderEdit from "@/components/orders/Edit.vue"
import router from "@/plugins/router";
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
    title: lang('OrdersEdit'),
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <div>
    <base-breadcrumb :title="lang('OrdersEditDescription')" :breadcrumbs="breadcrumbs"></base-breadcrumb>
    <OrderEdit :id="router.currentRoute.value.params.id"/>
  </div>
</template>
