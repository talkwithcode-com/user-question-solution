const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SolutionSchema = new Schema({
    type: Number,
    input: String,
    output: String
})

const Solution = mongoose.model('Solution', SolutionSchema)

module.exports = Solution