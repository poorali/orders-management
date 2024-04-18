<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/breadcrumb/Base.vue";
import OrdersList from "@/components/orders/List.vue"
import {lang} from "@/locales/messages";
import {ref} from "vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import {useRouter} from "vue-router";
const router = useRouter()
const breadcrumbs = ref([
  {
    title: lang('SuperAdmin'),
    disabled: false,
    to: '/'
  },
  {
    title: lang('Orders'),
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <div>
    <base-breadcrumb :title="lang('OrdersListDescription')" :breadcrumbs="breadcrumbs">
      <template v-slot:actions>
        <CustomButton @click="() => router.push({name:'OrdersCreate'})">{{lang('OrdersCreate')}}</CustomButton>
      </template>
    </base-breadcrumb>
    <OrdersList/>
  </div>
</template>
