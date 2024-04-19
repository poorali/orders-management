const express = require('express')
const cors = require('cors')
const {lang} = require("./locales/messages");
const {PrismaClient} = require("@prisma/client");
const validate = require("./middlewares/yup");
const CreateRequest = require("./requests/orders/CreateRequest")
const useOrderModel = require("./models/order")
const corsConfig = require('./configs/cors')

const order = useOrderModel()
const app = express()
app.use(express.json())
app.use(cors(corsConfig))


const port = 5000
require('dotenv').config()

const prisma = new PrismaClient()
//Home Page Route
app.get('/', (req, res) => {
    return res.json({message: lang('WelcomeMessage')})
})

//Get the list of products to show in orders create and edit
app.get('/products', async (req, res) => {
    return res.json({
        status: "success",
        products: await prisma.products.findMany({where: {stock:{not:{equals: 0}}}})
    })
})

//List of orders
app.get('/orders', async(req, res) => {
    const orders = await order.getList(req.query?.search, req.query?.page)
    return res.json({...{status: 'success'},...orders})
})

//Create new order
app.post('/orders/create', validate(CreateRequest), async (req, res) => {
    const savedOrder = await order.create(req.body)

    if ((await savedOrder).status === 'error') {
        return res.status(400).json(savedOrder)
    }
    return res.json(savedOrder)
})

//Get the details of a specific order
app.get('/orders/:id', async(req, res) => {
    const viewOrder = await prisma.orders.findUnique({
        where: { id: parseInt(req.params.id), is_deleted: false },
        include: {
            items: {
                select: {
                    id: true,
                    quantity: true,
                    price_per_unit: true,
                    product_id: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    if (!viewOrder) {
        return res.status(404).json({status: 'error', errors: {general: lang('NotFound')}})
    }
    return res.json({status: 'success', order: viewOrder})
})

// Edits an order information
app.post('/orders/edit/:id',validate(CreateRequest), async (req, res) => {
    //Get previous order to edit
    let prevOrder = await prisma.orders.findUnique({where: {id: parseInt(req.params.id), is_deleted: false}, include: {items: true}})
    if (!prevOrder) {
        return res.status(404).json({status: 'error', errors: {general: lang('NotFound')}})
    }

    prevOrder = await order.create(req.body, prevOrder)

    if ((await prevOrder).status === 'error') {
        return res.status(400).json(prevOrder)
    }
    return res.json(prevOrder)
})


///Deletes an order
app.delete('/orders/:id', async(req, res) => {
    let deleteOrder = await prisma.orders.findUnique({where: {id: parseInt(req.params.id), is_deleted: false}, include: {items: true}})
    if (!deleteOrder) {
        return res.status(404).json({status: 'error', errors: {general: lang('NotFound')}})
    }
    deleteOrder = await order.remove(deleteOrder)
    if ((await deleteOrder).status === 'error') {
        return res.status(400).json(deleteOrder)
    }
    return res.json(deleteOrder);
})


app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})