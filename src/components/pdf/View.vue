<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-bold mb-3">{{lang('PdfViewer')}}</h3>
      <CustomButton size="small"  @click="download" variant="outlined" class="hover:bg-blue-100">
        <img src="@/assets/icons/pdf.svg" width="18" :alt="lang('DownloadPDF')"/>
      </CustomButton>
    </div>
    <VuePDF v-if="pdf" class="m-auto" :pdf="pdf"/>
    <img src="@/assets/images/loading.svg" class="p-20 m-auto" :alt="lang('Loading')" v-else/>

  </div>
</template>
<script lang="ts" setup>
import {usePDF, VuePDF} from "@tato30/vue-pdf";
import {lang} from "@/locales/messages";
import CustomButton from "@/components/shared/CustomButton.vue";

const props = defineProps({
  src: {},
  fileName: { default: 'view-pdf'}
})
const {pdf} = usePDF(props.src)

const download  = () => {
  const link = document.createElement('a');
  link.href = props.src.toString()
  link.download = props.fileName  + '.pdf'
  link.click()
}
</script>