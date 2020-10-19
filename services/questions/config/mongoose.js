const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection

module.exports = db