const userRouter = require("./userRouter");
const router = require("express").Router();
const QuestionController = require("../controllers/QuestionController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", function (req, res) {
  res.status(200).json({ msg: "masuk" });
});
router.use("/users", userRouter); //login register done

router.use(authentication);
router.get("/questions", QuestionController.Find); //done
router.get("/questions/:id/solution", QuestionController.ReadSolution); // done
router.post("/questions", QuestionController.CreateQuestion); //done
router.put("/question/:id/add-solution", QuestionController.AddSolution); //done
router.put(
  "/question/:id/add-sample-solution",
  QuestionController.AddSampleSolution
); //done

router.delete(
  "/questions/:question_id",
  authorization,
  QuestionController.DeleteQuestion
); //done
router.put(
  "/questions/:question_id",
  authorization,
  QuestionController.UpdateQuestion
);
router.delete(
  "/questions/:question_id/:solution_id",
  authorization,
  QuestionController.DeleteSolution
);

module.exports = router;
