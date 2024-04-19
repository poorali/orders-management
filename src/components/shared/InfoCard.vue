<script lang="ts" setup>

const props = defineProps<{color: string, textColor?: string, title: string, value: any}>()
</script>
<template>
  <div :class="`decoration-0 flex items-center justify-center text-center rounded-md p-6 bg-${color} text-${textColor}`">
    <div :class="'bg-' + color">
      <slot name="icon"></slot>
      <div :class="'text-xs capitalize font-bold mt-3 text-' + textColor" v-text="title"></div>
      <h4 :class="'text-sm mt-1 text-' + textColor" v-text="value"></h4>
    </div>
  </div>
</template>