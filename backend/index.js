const express = require('express')
const {lang} = require("./locales/messages");
const {PrismaClient} = require("@prisma/client");
const app = express()
app.use(express.json())
const port = 5000
require('dotenv').config()

const prisma = new PrismaClient()
//Home Page Route
app.get('/', (req,res) => {
    return res.json({message: lang('WelcomeMessage')})
})

//Get the list of products to show in orders create and edit
app.get('/products', async (req,res) => {
    const products =  await prisma.products.findMany();
    return res.json({
        status: "success",
        products: await prisma.products.findMany()
    })
})

//List of orders
app.get('/orders', (req,res) => {
    return res.json({message: "Orders List"})
})

//Create new order
app.post('/orders/create', (req,res) => {
    return res.json({message: "Orders Create"})
})

//Get the details of a specific order
app.get('/orders/:id', (req,res) => {
    return res.json({message: "Orders List"})
})

// Edits an order information
app.post('/orders/edit/:id', (req,res) => {
    return res.json({message: "Orders Edit"})
})


///Deletes an order
app.delete('/orders/delete', (req,res) => {
    return res.json({message: "Orders Delete"})
})



app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})