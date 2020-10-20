if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} 
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')
require('./config/mongoose')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(routes)
app.use(routers)
app.use(errorHandler)

module.exports = app