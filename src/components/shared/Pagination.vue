<template>
    <div class="flex items-center mt-4" v-if="lastPage">
      <button :disabled="page === 1" class="disabled:opacity-30 px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100" @click="navigate('prev')">Previous</button>
      <span class="px-2 py-1 text-gray-500">{{ page }} / {{ lastPage }}</span>
      <button :disabled="page === lastPage" class="disabled:opacity-30 px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100" @click="navigate()">Next</button>
    </div>
</template>
<script setup lang="ts">
import type {PaginateType} from "@/types/ServiceTypes";
import {ref, watch} from "vue";

defineProps<{lastPage: number}>()
//Implement two-way binding for current page state to apply changes in both parent and children component (when navigating)
const page = defineModel<number>({default: 1})
const navigate = (to:string = "next") => {
  page.value += to === 'next' ? 1 : -1
}
</script>