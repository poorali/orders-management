<script setup lang="ts">
import TextInput from "@/components/shared/TextInput.vue";
import DataTable from "@/components/shared/DataTable.vue";
import BaseBreadcrumb from "@/components/shared/breadcrumb/Base.vue";
import {lang} from "@/locales/messages";
import {ref} from "vue";
import CustomButton from "@/components/shared/CustomButton.vue";
const breadcrumbs = ref([
  {
    title: lang('SuperAdmin'),
    disabled: false,
    to: '/'
  },
  {
    title: lang('Orders'),
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <base-breadcrumb title="HALLO" :breadcrumbs="breadcrumbs"></base-breadcrumb>
  <main class="bg-white p-10 border-2 rounded">
    <TextInput name="Cellphone" type="text" label="Hi THere"/>
    <DataTable :headers="['title','name','email','cellphone','actions']" :items="[{ id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890' },{ id: 2, name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890' }]" >
      <template v-slot:item.actions="{item}: {item:object}">
      </template>
    </DataTable>
  </main>
</template>
