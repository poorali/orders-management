const express = require('express')
const {lang} = require("./locales/messages");
const app = express()
app.use(express.json())
const port = 5000
require('dotenv').config()

//Home Page Route
app.get('/', (req,res) => {
    return res.json({message: lang('WelcomeMessage')})
})

//Get the list of products to show in orders create and edit
app.get('/products', (req,res) => {
    return res.json({message: "Products List"})
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