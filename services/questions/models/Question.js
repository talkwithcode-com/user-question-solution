const mongoose = require('mongoose')
const Schema = mongoose.Schema
const QuestionSchema = new Schema({
    timeLimit: Number,
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    score: {
        type: String,
        required: [true, 'Score is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    user_id: String,
    sample_solution: [{
        type: Schema.Types.ObjectId, // ObjectId
        input: String,
        output: String,
    }],
    solution: [ // default []
        {
        type: Schema.Types.ObjectId, // ObjectId
        ref: 'Solution'
        }
    ]
})

const Question = mongoose.model("Question", QuestionSchema)

module.exports = Question