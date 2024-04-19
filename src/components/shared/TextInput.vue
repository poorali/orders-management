<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import {beautify} from "@/utils/helpers/errors"
const model = defineModel()
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  customClass: {
    type: String,
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const name = toRef(props, "name");
const { value: inputValue, errorMessage, handleBlur, handleChange, meta } = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div :class="{ 'border-red-500': !!errorMessage, 'border-green-500': meta.valid }">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
        v-model="model"
        :type="type"
        :id="name"
        :name="name"
        :disabled="disabled"
        @input="handleChange"
        @blur="handleBlur"
        :placeholder="placeholder"
        class="px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm w-full block border border-gray-300"
    />
    <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ beautify(errorMessage)}}</div>
  </div>
</template>