import {object, string} from 'yup'
const schema = object({
    email: string().email().required(),
    password: string().required(),
})
export default schema