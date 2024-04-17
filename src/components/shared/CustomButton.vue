<template>
  <component
      :is="tag"
      :type="type"
      :disabled="disableButton"
      :class="[btnClass, colorVariants]"
      :variant="variant"
      :variant-type="variantType"
      :size="size"
      :href="to"
  >
    <img v-if="loadingRef" src="@/assets/images/loading.svg" alt="Loading..."/>
    <slot v-else/>
  </component>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';

const props = defineProps({
  tag: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: "primary"
  },
  variantType: {
    type: String,
    default: "normal"
  },
  size: {
    type: String,
    default: "normal"
  },
  rounded: {
    type: String,
    default: "medium"
  },
  type: {
    type: String,
    default: ""
  },
  to: {
    type: String
  },
  loading:{default: false}
});

const loadingRef = ref(props.loading);
const disableButton = ref(props.disabled || loadingRef.value); // Set default value with nullish coalescing

const btnClass = computed(() => ({
  'base-spinner': loadingRef.value,
  'cursor-not-allowed': disableButton.value,
  'base-button inline-flex align-middle align-items-center justify-center font-medium focus:outline-none border-2': true,
  'rounded-lg': props.rounded === 'medium',
  'rounded-full': props.rounded === 'large',
  'px-3 py-2': props.size === 'normal',
  'px-2 py-1': props.size === 'small',
}));

const colorVariants = computed(() => {
  switch (props.variant) {
    case 'primary':
      switch (props.variantType) {
        case 'normal':
          return disableButton.value
              ? 'border-blue-300 bg-blue-300 text-white'
              : 'border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white';
        case 'outline':
          return 'border-gray-200 text-blue-500 hover:text-blue-700';
        default:
          return '';
      }
    default:
      return '';
  }
});
</script>