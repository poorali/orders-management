<template>
  <main class="bg-white p-5 border-2 rounded  flex flex-col">
    <Form @submit="submit" :validation-schema="CreateSchema" class="flex flex-col" v-if="order">
      <div class="flex flex-wrap justify-between">
        <TextInput name="customer_name" :value="order.customer_name" v-model="order.customer_name"
                   class="w-full md:w-6/12" :label="lang('CustomerName')"/>
        <TextInput name="customer_address" :value="order.customer_address" v-model="order.customer_address"
                   class="w-full mt-4 pl-2 md:mt-0 md:w-6/12" :label="lang('CustomerAddress')"/>
      </div>
      <OrderItems :items="order.items"/>
      <CustomButton :loading="loading" size="small" class="ml-auto mt-4">{{ lang('OrdersEdit') }}</CustomButton>
    </Form>
    <img src="@/assets/images/loading.svg" class="p-20 m-auto" :alt="lang('Loading')" v-else/>
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
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import type {OrderType} from "@/types/OrderTypes";

const order = ref<OrderType>()
const loading = ref(false)
const orderStore = useOrderStore()
const router = useRouter()
const props = defineProps<{ id: string }>()

onMounted(() => {
  orderStore.show(props.id).then(r => {
    order.value = r
  })
})

const submit = (values: object, {setErrors}: any) => {
  if(order.value && order.value.id){
    loading.value = true;
    orderStore.edit(order.value.id, values)
        .then(r => {
          router.push({name: 'OrdersView', params: {id: r.order.id}})
        })
        .catch(error => {
          setErrors(error.errors)
        })
        .finally(() => loading.value = false)
  }
}
</script>