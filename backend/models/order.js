const useProductModel = require("./product")
const {PrismaClient} = require("@prisma/client");
const {lang} = require("../locales/messages");
const useOrderModel = () => {
    const product = useProductModel()
    const prisma = new PrismaClient()
    const create = async (productFormData) => {
        try {
            //Validate if the product is available in stock system then update stocks
            const updateStock = await product.validateStock(productFormData.items)
            if(updateStock.status === 'error'){
                throw updateStock.errors
            }

            // Create order and order items
            const order = await prisma.orders.create({
                data: {
                    customer_name: productFormData.customer_name,
                    customer_address: productFormData.customer_address,
                    items: {
                        create: updateStock.products
                    }
                },
                include: {
                    items: true
                }
            })
            if (!order) {
                throw {general: lang('NotHandledException')}
            }
            return {status: 'success', message: lang('OrdersCreateSuccess'),order}
        } catch (errors) {
            return {status: 'error', errors}
        }
    }
    return {create}
}

module.exports = useOrderModel