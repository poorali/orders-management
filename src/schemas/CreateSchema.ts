import {object, number, array, string} from "yup"
import {lang} from "@/locales/messages";
const itemsSchema = object().shape({
    product_id: number().required().min(1),
    quantity: number().required().min(1).max(10)
});

export default object({
    items: array().of(itemsSchema).required(lang('ItemsRequired')).min(1),
    customer_name: string().required(),
    customer_address: string().min(5).required()
})