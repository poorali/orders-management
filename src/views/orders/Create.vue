<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/breadcrumb/Base.vue";
import CreateOrder from "@/components/orders/Create.vue"
import {lang} from "@/locales/messages";
import {ref} from "vue";
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
    title: lang('OrdersCreate'),
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <div>
    <base-breadcrumb :title="lang('OrdersCreateDescription')" :breadcrumbs="breadcrumbs"></base-breadcrumb>
    <CreateOrder/>
  </div>
</template>
