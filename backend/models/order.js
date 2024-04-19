const useProductModel = require("./product")
const {PrismaClient} = require("@prisma/client");
const {lang} = require("../locales/messages");
const useOrderModel = () => {
    const product = useProductModel()
    const prisma = new PrismaClient()
    const create = async (productFormData, prevOrder = null) => {
        try {
            //Reformat items into array like this => ["id": "quantity"]
            const items = productFormData.items.reduce((acc, item) => (acc[item.product_id] = item.quantity, acc), {})

            //Reformat previous items into array like this => ["id": "quantity"]
            const prevOrderItems = prevOrder ? prevOrder.items.reduce((acc, item) => (acc[item.product_id] = item.quantity, acc), {}) : []
            //Validate if the product is available in stock system then update stocks
            const updateStock = await product.validateStock(items, prevOrderItems)
            if (updateStock.status === 'error') {
                throw updateStock.errors
            }

            // Create order and order items
            const body = {
                data: {
                    customer_name: productFormData.customer_name,
                    customer_address: productFormData.customer_address,
                    items: {
                        deleteMany: prevOrder ? {} : undefined,
                        create: updateStock.products
                    }
                },
                include: {
                    items: true
                }
            }

            const order = prevOrder ? await prisma.orders.update({...body, ...{where: {id: prevOrder.id}}}) : await prisma.orders.create(body)
            if (!order) {
                throw {general: lang('NotHandledException')}
            }
            return {status: 'success', message: lang(prevOrder ? 'OrdersEditSuccess':'OrdersCreateSuccess'), order}
        } catch (errors) {
            return {status: 'error', errors}
        }
    }


    const getList = async (search = '', page = 1, perPage = 5) => {
        // Sanitize user input for search term to prevent injection attacks
        const sanitizedSearch = search?.trim();

        let whereClause = sanitizedSearch
            ? {
                OR: [
                    {customer_name: {contains: sanitizedSearch}},
                    {customer_address: {contains: sanitizedSearch}},
                ],
            }
            : {};

        /// Merge where clause with default query conditions
        whereClause = {...{is_deleted: false}, ...whereClause}
        const skip = (page - 1) * perPage;
        const take = perPage;

        const orders = await prisma.orders.findMany({
            where: whereClause,
            skip,
            take,
            include: {items: true},
            orderBy: {id: 'desc'},
        });

        const totalOrders = await prisma.orders.count({where: whereClause});

        return {
            orders,
            pagination: {
                currentPage: page,
                perPage,
                lastPage: Math.ceil(totalOrders / perPage),
            },
        };
    }

    const remove = async(order) => {
        try {
            return await prisma.$transaction(async (tx) => {
                //Increase the stock of order items' products before safe delete
                order.items.map(async(item) => {
                    await product.updateStock(tx,item.product_id,{increment: item.quantity})
                })

                //Safe delete the order and return
                const deletedOrder = await tx.orders.update({data: {is_deleted: true}, where: {id: order.id},include: {items: true}})
                if(!deletedOrder){
                    throw Error()
                }
                return {status: 'success', message: lang('OrdersDeleteSuccess'),order: deletedOrder}
            })
        } catch (errors){
            return {status: 'error', errors: {general: lang('NotHandledException')}}
        }
    }

    return {create, getList, remove}
}

module.exports = useOrderModel