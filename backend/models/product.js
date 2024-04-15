const {PrismaClient} = require("@prisma/client");
const {lang} = require("../locales/messages");

const useProductModel = () => {
    const prisma = new PrismaClient()
    const validateStock = async (items) => {
        try{
            return await prisma.$transaction(async (tx) => {
                let stockErrors = {}
                const products = await Promise.all(
                    items.map(async (item, index) => {
                        let product = await tx.products.findUnique({
                            where: {id: item.id},
                        });

                        if (!product) {
                            return stockErrors[`items[${index}]`] = lang("ItemInvalidError")
                        }
                        if (product.stock < item.quantity) {
                            return stockErrors[`items[${index}]`] = lang("ItemStockError")
                        }

                        //Update Stock
                       await tx.products.update({
                            data: {
                                stock: product.stock - item.quantity
                            },
                            where: {
                                id: item.id
                            }
                        })


                        return {product_id: product.id, quantity: item.quantity, price_per_unit: product.price}
                    })
                );
                if (Object.keys(stockErrors).length !== 0) {
                    throw stockErrors
                }
                return {status: 'success', products}
            })
        }catch (errors){
            return {status: 'error', errors}
        }
    }
    return {validateStock}
}

module.exports = useProductModel