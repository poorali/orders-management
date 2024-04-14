import {createI18n} from "vue-i18n";
import messages from "@/locales/messages";

export default createI18n({
    locale: import.meta.env.VITE_SITE_LANG,
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});