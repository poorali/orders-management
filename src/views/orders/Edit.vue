<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/breadcrumb/Base.vue";
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
    title: lang('OrdersEdit'),
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <div>
    <base-breadcrumb :title="lang('OrdersEditDescription')" :breadcrumbs="breadcrumbs"></base-breadcrumb>
    <div>This is Order Edit</div>
  </div>
</template>
