if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} 
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')
const listen = require('./bin/http')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
module.exports = app