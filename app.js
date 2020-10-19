const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
require('./config/mongoose')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandler)



module.exports = app