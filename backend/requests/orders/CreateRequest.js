const yup = require('yup')
const {lang} = require("../../locales/messages");


const itemsSchema = yup.object().shape({
    id: yup.number().required().min(1),
    quantity: yup.number().required().min(1).max(10)
});

const schema = yup.object({
    customer_name: yup.string().min(5).required(),
    customer_address: yup.string().min(5).required(),
    items: yup.array().of(itemsSchema).required().min(1),
})
module.exports = schema;