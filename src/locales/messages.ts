import en from './en.json';
import type {MessagesType} from "@/types/LocaleTypes";

const messages: MessagesType = {
    en
};

export function lang(key: string): string {
    return messages[import.meta.env.VITE_SITE_LANG][key] || `[${key} not found]`;
}

export default messages;