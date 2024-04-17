<template>
  <div class="container mx-auto overflow-auto">
    <slot name="top"></slot>
    <table class="table-auto w-full text-left">
      <thead>
      <tr class="text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
        <th v-for="(header) in headers" :key="header">{{ header }}</th>
        <slot name="header.actions"></slot>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in items" :key="index" class="border-b border-gray-200">
        <slot name="item" v-bind="{item,index}">
          <td v-for="(value,key) in item" :key="value">
            <slot :name="'item.' + key" v-bind:="{value, key}">{{value}}</slot>
          </td>
        </slot>
        <slot name="item.actions" v-bind="{item,index}"></slot>
      </tr>
      </tbody>
    </table>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts" setup>
const {headers, items} = defineProps<{headers: Array<string>, items: Array<object>}>()
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