<template>
  <nav class="breadcrumb">
    <ul class="flex">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <component :is="crumb.disabled ? 'span': 'router-link'" class="mr-2 text-sm hover:underline cursor-pointer" :class="{'opacity-50': crumb.disabled}" :to="crumb.to">{{ crumb.title }}</component>
        <span v-if="index !== breadcrumbs.length -1" class="mr-2">-></span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import type {BreadCrumbItem} from "@/types/BreadCrumbTypes";

defineProps<{ breadcrumbs: BreadCrumbItem[] }>()
</script>