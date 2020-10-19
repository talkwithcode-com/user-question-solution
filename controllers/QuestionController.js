const db = require('../models')
const Question = db.Question
const Solution = db.Solution

module.exports = class QuestionController {
    static Find(req, res, next) {
        Question.find({})
            .populate("solution")
            .then((data) => {
                res.status(200).json({ data })
            })
            .catch(next)
    }

    static ReadSolution(req, res, next) {
        const _id = req.params.id
        Solution.find({ _id })
            .then((data) => {
                res.status(200).json({ solution: data })
            })
            .catch(next)
    }

    static CreateQuestion(req, res, next) {
        Question.create(req.body)
            .then((data) => {
                res.status(201).json({message: "create the question successful"})
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static AddSolution(req, res, next) {
        const { id } = req.params
        const payload = req.body
        Solution.create(payload)
            .then((data) => {
                return Question.findOneAndUpdate(
                    { "_id": id },
                    { $push: { solution: data } },
                    { new: true, useFindAndModify: false }
                )
            })
            .then((Question) => {
                res.status(201).json({ Question })
            })
            .catch(next)
    }

    static DeleteQuestion(req, res, next) {
        const _id = req.params.id
        Question.deleteOne({ _id })
            .then((data) => {
                res.status(200).json({ data })
            })
            .catch(next)
    }

    static DeleteSolution(req, res, next) {
        const { question_id, solution_id } = req.params
        console.log(question_id, solution_id)
        Question.findOne(
            { "_id": question_id }, () => {
                return Solution.deleteOne(
                    { "_id": solution_id }
                )
                    .then((data) => {
                        res.status(200).json({ data })
                    })
            }

        )
        // Question.deleteSolution(question_id, solution_id)
        //     .then((data) => {
        //         res.status(200).json({ data })
        //     })
        //     .catch(next)
    }
}