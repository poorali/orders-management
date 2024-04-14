import {object,string} from "yup"

export default object({
    title: string().required()
})