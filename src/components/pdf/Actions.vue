<template>
  <div class="flex w-full items-center">
    <div class="mr-4">
      <CustomButton size="small"  class="w-5 h-5 p-0 text-center flex justify-center items-center mr-2" @click="zoom('out')">-</CustomButton>
      <span>{{ actions.scale * 100 }}%</span>
      <CustomButton size="small" class="w-5 h-5 p-0 text-center flex justify-center items-center ml-2" @click="zoom('in')">+</CustomButton>
    </div>
    <Pagination class="mt-0 ml-auto" :last-page="pages" v-model="actions.page"/>
  </div>
</template>
<script setup lang="ts">
import type {ActionPropType} from "@/types/PdfViewerTypes";

const actions = defineModel<ActionPropType>({default:{scale: 1, page: 1}})
import CustomButton from "@/components/shared/CustomButton.vue";
import Pagination from "@/components/shared/Pagination.vue";

const props = defineProps<{pages: number}>()
const zoom = (type = 'out') =>{
    actions.value.scale = type === 'out'
        ?
        actions.value.scale > 0.25 ? actions.value.scale - 0.25 : actions.value.scale
        :
        actions.value.scale < 2 ? actions.value.scale + 0.25 : actions.value.scale
}
</script>