<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "./Header.vue";
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <div class="flex flex-col flex-1 overflow-y-auto p-4">
      <Header />
      <router-view />
    </div>
  </div>
</template>