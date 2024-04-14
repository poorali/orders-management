const express = require('express')
const app = express()
app.use(express.json())
const port = 5000

app.get('/', (req,res) => {
    res.json({status: 'success'})
})

app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})