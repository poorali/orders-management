<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-hidden bg-gray-800 bg-opacity-50" @click="closeModal">
    <div class="flex items-center justify-center min-h-screen">
      <!-- Modal Header -->
      <div @click.stop class="bg-white rounded-lg overflow-auto w-full overflow-y-auto m-5 shadow-lg relative flex flex-col">
        <div class="flex items-center justify-between mx-4 my-2">
          <h3>{{title}}</h3>
          <button type="button" @click="closeModal" class="text-2xl text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <!-- Modal Body -->
          <div class="h-96 overflow-auto">
            <slot></slot>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {lang} from "@/locales/messages";

const show = defineModel()

const props = defineProps({title: {default: lang('ModalTitle')}})
const closeModal = () => {
  show.value = false;
};
</script>