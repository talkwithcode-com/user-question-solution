const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SolutionSchema = new Schema({
    type: Number,
    input: {
        type: String,
        required: [true, 'Input is required']
    },
    output: {
        type: String,
        required: [true, 'Output is required']
    }
})

const Solution = mongoose.model('Solution', SolutionSchema)

module.exports = Solution