const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')


router.get('/', function (req, res) {
    res.status(200).json({ msg: 'masuk' })
})
router.get('/questions', QuestionController.Find)
router.get('/questions/:id/solution', QuestionController.ReadSolution)
router.post('/questions', QuestionController.CreateQuestion)
router.put('/question/:id/add-solution', QuestionController.AddSolution)
router.delete('/questions/:id', QuestionController.DeleteQuestion)
router.delete('/questions/:question_id/:solution_id', QuestionController.DeleteSolution)

module.exports = router