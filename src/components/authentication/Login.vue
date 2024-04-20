<template>
  <div class="flex flex-col m-auto h-100 justify-center items-center">
    <h1 class="text-2xl">
      {{lang('SignIn')}}
    </h1>
    <Form class="mt-4" @submit="login" :validation-schema="LoginSchema">
      <TextInput name="email" :label="lang('Email')" v-model="email" :value="email"/>
      <TextInput type="password" name="password" class="mt-5" :label="lang('Password')" v-model="password" :value="password"/>
      <CustomButton class="mt-4">Submit</CustomButton>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import {Form} from "vee-validate";
import TextInput from "@/components/shared/TextInput.vue";
import LoginSchema from "@/schemas/LoginSchema";
import {lang} from "@/locales/messages";
import {ref} from "vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import {useAuthStore} from "@/stores/auth";
const email = ref()
const password = ref()
const loading = ref(false)

const authStore = useAuthStore()
const login = (values: { email: string, password: string } | any, {setErrors}:any) => {
  loading.value = true
  authStore.login(values.email, values.password)
      .catch(error => {
        loading.value = false;
        console.log(error)
        setErrors(error.errors)
      })
}
</script>