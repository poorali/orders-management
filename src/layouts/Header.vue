<template>
  <header class="px-4 py-2 flex justify-between items-center">
    <span>Welcome, Admin</span>
    <button class="hover:text-gray-200" @click="() => authStore.logout()">{{ lang('SignOut') }}</button>
  </header>
</template>

<script lang="ts" setup>
import {useAuthStore} from "@/stores/auth";
import {lang} from "@/locales/messages";
const authStore = useAuthStore()
</script>
