<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "./Header.vue";
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-50 flex-col p-4 overflow-y-auto">
    <Header />
    <router-view />
  </div>
</template>