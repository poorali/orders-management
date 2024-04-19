<template>
  <main class="bg-white p-5 border-2 rounded  flex flex-col">
    <Form @submit="submit" :validation-schema="CreateSchema" class="flex flex-col">
      <div class="flex flex-wrap justify-between">
        <TextInput name="customer_name" class="w-full md:w-6/12" :label="lang('CustomerName')"/>
        <TextInput name="customer_address" class="w-full mt-4 pl-2 md:mt-0 md:w-6/12" :label="lang('CustomerAddress')"/>
      </div>
      <OrderItems/>
      <CustomButton :loading="loading" size="small" class="ml-auto mt-4">{{ lang('OrdersCreate') }}</CustomButton>
    </Form>
  </main>
</template>

<script lang="ts" setup>
import TextInput from "@/components/shared/TextInput.vue";
import {Form} from "vee-validate";
import {lang} from "@/locales/messages";
import OrderItems from "@/components/orders/OrderItems.vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import CreateSchema from "@/schemas/CreateSchema";
import {useOrderStore} from "@/stores/order";
import {ref} from "vue";
import {useRouter} from "vue-router";

const loading = ref(false)
const orderStore = useOrderStore()
const router = useRouter()
const submit = (values: object, {setErrors}:any) => {
  loading.value = true;
  orderStore.create(values)
      .then(r => {
        router.push({name: 'OrdersView', params: {id: r.order.id}})
      })
      .catch(error => {
        setErrors(error.errors)
      })
      .finally(() => loading.value = false)
}
</script>