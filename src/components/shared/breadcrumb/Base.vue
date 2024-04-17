<template>
  <div class="bg-blue-100 rounded-md mb-4 mt-4 py-4 md:py-0 relative">
    <div class="px-8  position-relative">
      <div class="flex justify-between items-center">
        <div class="flex py-0 flex-col">
          <h3 class="text-3xl mb-2" v-if="title">{{ title }}</h3>
          <Body :breadcrumbs="breadcrumbs"/>
        </div>
        <div class="flex overflow-hidden">
          <div class="mb-4 mt-3">
            <img class="w-[50px] md:w-[100px]" src="@/assets/images/breadcrumb/ChatBc.png" alt="breadcrumb" />
          </div>
        </div>
        <div class="absolute right-0 top-0 flex justify-center mx-4 h-full items-center">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Body from "./Body.vue";
import type {BreadCrumbItem} from "@/types/BreadCrumbTypes";

defineProps<{title: string, breadcrumbs: BreadCrumbItem[]}>();
</script>