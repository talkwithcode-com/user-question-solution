const { Question } = require('../models')

async function authorization(req, res, next) {
    const  _id  = req.params.question_id
    console.log(req.headers.test)
    try {
        const data = await Question.findById({_id})
        if (!data) throw { name: "NOT FOUND" }
        else if (data.user_id === req.loggedInUser.id || data.user_id === req.headers.test)
            next()
        else throw { name: "unauthorized" }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization