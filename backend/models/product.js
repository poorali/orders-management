const {PrismaClient} = require("@prisma/client");
const {lang} = require("../locales/messages");

const useProductModel = () => {
    const prisma = new PrismaClient()
    const validateStock = async (items, prevItems = []) => {
        try {
            return await prisma.$transaction(async (tx) => {
                let stockErrors = {}
                if (Object.keys(prevItems).length !== 0) {
                    Object.keys(prevItems).filter(key => items[key] === undefined).map(async(key) => {
                        await updateStock(tx,key,{increment: prevItems[key]})
                    })
                }

                let counter = 0;
                const products = await Promise.all(
                    Object.keys(items).map(async (index) => {
                        const quantity = items[index]
                        let product = await tx.products.findUnique({
                            where: {id: parseInt(index)},
                        });

                        if (!product) {
                            return stockErrors[`items[${counter}]`] = lang("ItemInvalidError")
                        }
                        const updatedStock = quantity + (prevItems[index] ? -prevItems[index]: 0)
                        if (updatedStock > product.stock) {
                            return stockErrors[`items[${counter}].quantity`] = lang("ItemStockError")
                        }

                        //Update Stock
                        await updateStock(tx, index, updatedStock > 0 ? {decrement: Math.abs(updatedStock)}:{increment: Math.abs(updatedStock)})
                        counter++
                        return {product_id: product.id, quantity: quantity, price_per_unit: product.price}
                    })
                );
                if (Object.keys(stockErrors).length !== 0) {
                    throw stockErrors
                }
                return {status: 'success', products}
            })
        } catch (errors) {
            return {status: 'error', errors}
        }
    }

    const updateStock = async (tx, productId, stock) => {
        await tx.products.update({
            data: {stock},
            where: {
                id: parseInt(productId)
            }
        })
    }
    return {validateStock, updateStock}
}

module.exports = useProductModel