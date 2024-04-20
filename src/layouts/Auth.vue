<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-50 flex-col p-4 overflow-y-auto">
    <router-view />
  </div>
</template>