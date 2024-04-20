<template>
  <main class="flex flex-col">
    <div v-if="order" class="flex items-start flex-col md:flex-row">
      <div class="w-full md:w-8/12 p-10 mr-4 bg-white border-2 rounded">
        <View v-if="pdf" :src="pdf" :file-name="`Orders ${order.id}`"/>
        <img src="@/assets/images/loading.svg" class="p-20 m-auto" :alt="lang('Loading')" v-else/>

      </div>
      <div class="w-full md:w-4/12 p-10 bg-white border-2 rounded md:mt-0 mt-4">
        <h3 class="text-xl font-bold mb-3 mt-2">{{ lang('OrderCustomization') }}</h3>
        <TextInput name="headerColor" :value="headerColor" v-model="headerColor" :label="lang('HeaderColor')"/>
        <TextInput class="mt-2" name="valueColor" :value="valueColor" v-model="valueColor" :label="lang('ValueColor')"/>

      </div>
    </div>
    <img src="@/assets/images/loading.svg" class="p-20 m-auto" :alt="lang('Loading')" v-else/>
  </main>
</template>

<script lang="ts" setup>
import {lang} from "@/locales/messages";
import {onMounted, ref, watch} from "vue";
import type {OrderType} from "@/types/OrderTypes";
import {useOrderStore} from "@/stores/order";
import {generate} from "@/utils/helpers/pdf";
import View from "@/components/pdf/View.vue";
import OrderTemplate from "@/components/pdf/templates/OrderTemplate.vue";
import TextInput from "@/components/shared/TextInput.vue";
import {debounce} from "@/utils/helpers/debounce";

const orderStore = useOrderStore()
const order = ref<OrderType>()
const headerColor = ref<string>('black')
const valueColor = ref<string>('black')
const pdf = ref()
const props = defineProps<{ id: string }>()
const renderPDF = () => {
  pdf.value = null
  generate(OrderTemplate, {
    order: order.value,
    valueColor: valueColor.value,
    headerColor: headerColor.value
  }).then(url => pdf.value = url).catch(error => console.log(error))
}
onMounted(() => {
  orderStore.show(props.id).then((r: OrderType) => {
    order.value = r
    renderPDF()
  })
})

watch(headerColor, debounce(renderPDF, 500))
watch(valueColor, debounce(renderPDF, 500))

</script>