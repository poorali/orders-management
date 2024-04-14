// Types
import type { App } from 'vue'
import router from "@/plugins/router";
import pinia from "@/plugins/pinia";
import i18n from "@/plugins/i18n";
export function registerPlugins (app: App) {
    app.use(i18n)
    app.use(pinia)
    app.use(router)
}