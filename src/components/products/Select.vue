<template>
  <div>
    <DataTable class="p-0 m-0" :headers="headers" :items="productStore.products" :loading="loading">
      <template v-slot:item.name="{item}: {item: ProductType}">
        <td class="w-full">
          <div class="flex items-center">
            <img :src="item.image" :alt="lang('Image')" width="30">
            <span class="ml-4">{{ item.name }}</span>
          </div>
        </td>
      </template>

      <template v-slot:item.price="{item}: {item:ProductType}">
        <td class="flex justify-center"> ${{ new Intl.NumberFormat().format(item.price) }}</td>
      </template>

      <template v-slot:item.actions="{item}: {item: ProductType}">
        <td class="flex justify-center">
          <CustomButton type="button" class="border-none w-28" size="small" @click="selectProduct(item)" v-if="!selectedItems.includes(item.id)">
            {{ lang('Add') }}
          </CustomButton>
          <CustomButton class="bg-red-500 border-none w-28 hover:bg-red-600" size="small" @click="removeProduct(item)" type="button" v-else>
            {{ lang('Remove') }}
          </CustomButton>
        </td>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref} from "vue";
import {useProductStore} from "@/stores/product";
import DataTable from "@/components/shared/DataTable.vue";
import type {HeaderType} from "@/types/DataTableTypes";
import {lang} from "@/locales/messages";
import type {ProductType} from "@/types/ProductTypes";
import CustomButton from "@/components/shared/CustomButton.vue";

const props = defineProps(['onAdded', 'onRemoved', 'items'])
const loading = ref(false)
const selectedItems = ref<number[]>([])
const productStore = useProductStore()
const headers: HeaderType[] = [
  {title: lang('Name'), value: 'name'},
  {title: lang('Stock'), value: 'stock'},
  {title: lang('Price'), value: 'price'},
  {title: lang('Actions'), value: 'actions'},
]


onMounted(() => {
  selectedItems.value = props.items || []
  if (productStore.products.length === 0) {
    loading.value = true
    productStore.getList().finally(() => loading.value = false)
  }
})

const selectProduct = (product: ProductType) => {
  props.onAdded(product)
  selectedItems.value = [...selectedItems.value, ...[product.id]]
}

const removeProduct = (product: ProductType) => {
  props.onRemoved(product)
  const index = selectedItems.value.findIndex(item => item === product.id)
  if (index !== -1) {
    selectedItems.value.splice(index, 1)
  }
}
</script>