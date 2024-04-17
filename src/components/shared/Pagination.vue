<template>
    <div class="flex items-center mt-4">
      <button :disabled="pageRef === 1" class="disabled:opacity-30 px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100" @click="navigate('prev')">Previous</button>
      <span class="px-2 py-1 text-gray-500">{{ pageRef }} / {{ lastPage }}</span>
      <button :disabled="pageRef === lastPage" class="disabled:opacity-30 px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100" @click="navigate()">Next</button>
    </div>
</template>
<script setup lang="ts">
import type {PaginateType} from "@/types/ServiceTypes";
import {ref, watch} from "vue";

const {currentPage, lastPage, onUpdate} = defineProps<PaginateType & {onUpdate?: any}>()
const pageRef = ref<number>(currentPage)

const navigate = (to:string = "next") => {
  pageRef.value += to === 'next' ? 1 : -1
  emitUpdate(pageRef.value)
}

//Executes the callback function of changing the page in parent component only if onUpdate passed
const emitUpdate = (newPage: number) => {
  if(onUpdate){
    onUpdate(newPage)
  }else{
    console.warn('onUpdate is not provided in the component props')
  }
}
//Checks if the current page prop is changed from the parent then updates the local ref state
watch(() => currentPage, (updatePageProp) => {pageRef.value = updatePageProp})
</script>