<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-bold mb-3">{{lang('PdfViewer')}}</h3>
      <CustomButton size="small"  @click="download" variant="outlined" class="hover:bg-blue-100">
        <img src="@/assets/icons/pdf.svg" width="18" :alt="lang('DownloadPDF')"/>
      </CustomButton>
    </div>
    <div class="flex mb-4">
      <Actions v-model="options" :pages="pages"/>
    </div>
    <div class="overflow-auto flex justify-center items-center w-full">
      <VuePDF v-if="pdf" :pdf="pdf" :scale="options.scale" :page="options.page"/>
      <img src="@/assets/images/loading.svg" class="p-20 m-auto" :alt="lang('Loading')" v-else/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {usePDF, VuePDF} from "@tato30/vue-pdf";
import {lang} from "@/locales/messages";
import CustomButton from "@/components/shared/CustomButton.vue";
import {ref} from "vue";
import Actions from "./Actions.vue";
import type {ActionPropType} from "@/types/PdfViewerTypes";

const props = defineProps({
  src: {},
  fileName: { default: 'view-pdf'}
})
const {pdf, pages} = usePDF(props.src)
const options = ref<ActionPropType>({scale: 1, page: 1})
const download  = () => {
  const link = document.createElement('a');
  link.href = props.src.toString()
  link.download = props.fileName  + '.pdf'
  link.click()
}
</script>