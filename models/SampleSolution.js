const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SampleSolutionSchema = new Schema({
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

const SampleSolution = mongoose.model('SampleSolution', SampleSolutionSchema)

module.exports = SampleSolution