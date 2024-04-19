<template>
  <div class="flex justify-between mt-4 mb-2 items-end">
    <div class="flex flex-col">
      <h3 class="block text-sm font-medium text-gray-700 mb-1 mt-4">
        {{ lang('OrderItems') }}
      </h3>
      <h3 v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ beautify(errorMessage)}}</h3>
    </div>
    <CustomButton size="small" type="button" @click="() => showModal = true" variant="outlined">Add New Item
    </CustomButton>
  </div>
  <Modal v-model="showModal" :title="lang('SelectProduct')">
    <ProductSelect :items="itemsRef.map(item => item.product_id)" :on-added="productAdded" :on-removed="productRemoved"/>
  </Modal>
  <div class="bg-white p-5 border-2 rounded flex flex-col py-10">
    <DataTable :headers="headers" :items="itemsRef">
      <template v-slot:item.name="{item}: {item: OrderItemFormType}">
        <td class="w-full">
          <div class="flex items-center">
            <img :src="item.product?.image || item.image" :alt="lang('Image')" width="30">
            <span class="ml-4">{{ item.product?.name || item.name }}</span>
          </div>
        </td>
      </template>

      <template v-slot:item.price_per_unit="{item}: {item:OrderItemFormType}">
        <td class="flex justify-center"> ${{ formatPrice(item.price_per_unit) }}</td>
      </template>

      <template v-slot:item.actions="{item}: {item: OrderItemFormType}">
        <td class="flex justify-center ">
          <CustomButton class="bg-red-500 border-none w-28 hover:bg-red-600" size="small" @click="productRemoved({id: item.product_id})" type="button">
            {{ lang('Remove') }}
          </CustomButton>
        </td>
      </template>

      <template v-slot:item.quantity="{item, index}: {item: OrderItemFormType, index: number}">
        <td class="flex justify-center">
          <TextInput type="number" :name="`items[${index}].quantity`" class="w-80" :value="itemsRef[index].quantity.toString()" v-model="itemsRef[index].quantity"/>
          <TextInput  :name="`items[${index}].product_id`" class="w-80 hidden" :value="itemsRef[index].product_id.toString()" v-model="itemsRef[index].product_id"/>
        </td>
      </template>
    </DataTable>
  </div>

</template>

<script lang="ts" setup>
import {lang} from "@/locales/messages";
import type {OrderItemFormType, OrderItemType} from "@/types/OrderTypes";
import {ref, toRef, watch} from "vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import DataTable from "@/components/shared/DataTable.vue";
import type {HeaderType} from "@/types/DataTableTypes";
import Modal from "@/components/shared/Modal.vue";
import ProductSelect from "@/components/products/Select.vue"
import type {ProductType} from "@/types/ProductTypes";
import TextInput from "@/components/shared/TextInput.vue";
import {useField} from "vee-validate";
import {beautify} from "@/utils/helpers/errors";
import {formatPrice} from "@/utils/helpers/number";

const {errorMessage, resetField} = useField(toRef('items'))
const props = defineProps<{ items?: OrderItemType[] }>()
const itemsRef = ref<OrderItemFormType[]>(props.items || [])
const showModal = ref(false)
const headers: HeaderType[] = [
  {title: lang('Name'), value: 'name'},
  {title: lang('PricePerUnit'), value: 'price_per_unit'},
  {title: lang('Quantity'), value: 'quantity'},
  {title: lang('Actions'), value: 'actions'},
]

const productAdded = (product: ProductType) => {
  const newItem: OrderItemFormType = {product_id: product.id, price_per_unit: product.price, quantity: 1, image: product.image, name: product.name}
  itemsRef.value = [...itemsRef.value, ...[newItem]]
}

const productRemoved = (product: Partial<ProductType>) => {
  itemsRef.value = itemsRef.value.filter(item => item.product_id !== product.id)
}

watch(itemsRef, () => resetField())
</script>