<template>
  <slot name="top"></slot>
  <div class="container mx-auto mt-5 overflow-auto">
    <img src="@/assets/images/loading.svg"  class="m-auto" :alt="lang('Loading')" v-if="loading">
    <h2 class="text-sm text-center m-auto" v-else-if="items.length === 0">{{lang('NoRecord')}}</h2>
    <table class="table-auto w-full text-left" v-else>
      <thead>
      <tr class="text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
        <th v-for="(header) in headers" :key="header.title">{{ header.title }}</th>
        <slot name="header.actions"></slot>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in items" :key="index" class="border-b border-gray-200">
        <slot name="item" v-bind="{item,index}">
          <td v-for="(header,key) in headers" :key="header.value">
            <slot :name="'item.' + header.value" v-bind="{item: item, index}">{{item[header.value]}}</slot>
          </td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
  <slot name="bottom"></slot>
</template>

<script lang="ts" setup>
import {lang} from "@/locales/messages";
import type {HeaderType, ItemType} from "@/types/DataTableTypes";

defineProps<{headers: HeaderType[], items:ItemType[] , loading?: boolean}>()
</script>

<style scoped>
.table-auto {
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.table-auto th,
.table-auto td {
  padding: 0.5rem 1rem;
}
</style>