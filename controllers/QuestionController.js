const { Question, Solution, SampleSolution } = require("../models");

module.exports = class QuestionController {
  static Find(req, res, next) {
    Question.find({})
      .populate("solution")
      .populate("sample_solution")
      .then((questions) => {
        res.status(200).json({ questions });
      })
      .catch(next);
  }

  static ReadSolution(req, res, next) {
    const _id = req.params.id;
    console.log("masuk controller");
    Question.findOne({ _id })
      .populate("solution")
      .populate("sample_solution")
      .then((data) => {
        res.status(200).json({ questions: [data] });
      })
      .catch(next);
  }

  static CreateQuestion(req, res, next) {
    const payload = req.body;
    payload.user_id = req.loggedInUser._id;
    Question.create(payload)
      .then((data) => {
        res.status(201).json({
          id: data._id,
          title: data.title,
          score: data.score,
          description: data.description,
          user_id: data.user_id,
        });
      })
      .catch((err) => {
        console.log(err, "ini");
        next(err);
      });
  }

  static AddSampleSolution(req, res, next) {
    const { id } = req.params;
    const payload = req.body;
    SampleSolution.create(payload)
      .then((data) => {
        return Question.findOneAndUpdate(
          { _id: id },
          { $push: { sample_solution: data } },
          { new: true, useFindAndModify: false }
        );
      })
      .then((result) => {
        res.status(201).json({
          question_id: result._id,
          input: payload.input,
          output: payload.output,
        });
      })
      .catch(next);
  }

  static AddSolution(req, res, next) {
    const { id } = req.params;
    const payload = req.body;
    Solution.create(payload)
      .then((data) => {
        return Question.findOneAndUpdate(
          { _id: id },
          { $push: { solution: data } },
          { new: true, useFindAndModify: false }
        );
      })
      .then((result) => {
        res.status(201).json({
          question_id: result._id,
          input: payload.input,
          output: payload.output,
        });
      })
      .catch(next);
  }

  static DeleteQuestion(req, res, next) {
    const _id = req.params.question_id;
    Question.findByIdAndDelete({ _id })
      .populate("solution")
      .then((data) => {
        console.log(data.solution);
        let object = data.solution;
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const _id = object[key]._id;
            console.log(_id, "ini");
            return Solution.deleteOne({ _id });
          }
        }
      })
      .then((success) => {
        res.status(200).json({ success });
      })
      .catch((err) => {
        next(err);
      });
  }

  static DeleteSolution(req, res, next) {
    const { question_id, solution_id } = req.params;
    console.log(question_id, solution_id);
    Question.findOne({ _id: question_id }, () => {
      return Solution.deleteOne({ _id: solution_id }).then((success) => {
        res.status(200).json({ success });
      });
    });
    // Question.deleteSolution(question_id, solution_id)
    //     .then((data) => {
    //         res.status(200).json({ data })
    //     })
    //     .catch(next)
  }

  static UpdateQuestion(req, res, next) {
    Question.update(req.body)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        next(err);
      });
  }
};
