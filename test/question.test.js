const app = require("../app.js");
const request = require("supertest");
const User = require("../models/user");
const { Question, SampleSolution, Solution } = require("../models");
const { generateToken, verifyToken } = require("../helpers/jwt");

// const mongoose = require('mongoose');
// const QuestionModel = require('../models/Question')

let id;
let tes;

beforeAll(async (done, req) => {
  User.create({
    name: "tes",
    email: "tes@mail.com",
    password: "tes12345",
  })
    .then((user) => {
      const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
      };
      initial_token = generateToken(payload);
      const decoded = verifyToken(initial_token);
      tes = decoded._id;
      console.log(tes);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll(async (done) => {
  await User.deleteMany({});
  await Question.deleteMany({});
  await Solution.deleteMany({});
  await SampleSolution.deleteMany({});
  done();
});

describe(`POST /question - CREATE DATA QUESTION || Success CASE`, () => {
  test("201 Success post question - should create new question", (done) => {
    request(app)
      .post("/questions")
      .send({
        title: "tes",
        score: "stringtes",
        description: "string",
        user_id: "string",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty("title", expect.any(String));
        expect(body).toHaveProperty("score", expect.any(String));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("user_id", expect.any(String));
        id = body.id;
        done();
      });
  });
});

describe(`POST /question - CREATE DATA QUESTION || Fail CASE`, () => {
  test("400 Failed post question - should return error if title is empty", (done) => {
    request(app)
      .post("/questions")
      .send({
        title: "",
        score: "stringtes",
        description: "string",
        user_id: "string",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Title is required"])
        );
        done();
      });
  });

  test("400 Failed post question - should return error if score is empty", (done) => {
    request(app)
      .post("/questions")
      .send({
        title: "tes",
        score: "",
        description: "string",
        user_id: "string",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Score is required"])
        );
        done();
      });
  });

  test("400 Failed post question - should return error if score is empty", (done) => {
    request(app)
      .post("/questions")
      .send({
        title: "tes",
        score: "",
        description: "string",
        user_id: "string",
      })
      .set("access_token", initial_token)

      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Score is required"])
        );
        done();
      });
  });

  test("400 Failed post question - should return error if score is empty", (done) => {
    request(app)
      .post("/questions")
      .send({
        title: "tes",
        score: "tes",
        description: "",
        user_id: "string",
      })
      .set("access_token", initial_token)

      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Description is required"])
        );
        done();
      });
  });

  test("401 Failed post question - should return error if access_token is null", (done) => {
    request(app)
      .post("/questions")
      .send({
        title: "tes",
        score: "tes",
        description: "tes",
        user_id: "string",
      })

      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(expect.arrayContaining(["unauthorized"]));
        done();
      });
  });
});

describe(`PUT /question/:question_id/add-solution - ADD SOLUTION TO QUESTION || Success CASE`, () => {
  test("201 Success post question - should create new question", (done) => {
    request(app)
      .put(`/question/${id}/add-solution`)
      .send({
        input: "tes",
        output: "tes",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        console.log(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty("question_id", expect.any(String));
        expect(body).toHaveProperty("input", expect.any(String));
        expect(body).toHaveProperty("output", expect.any(String));
        done();
      });
  });
});

describe(`PUT /question/:question_id/add-solution - ADD SOLUTION TO QUESTION || Fail CASE`, () => {
  test("400 Failed put solution - should return error if input is empty", (done) => {
    request(app)
      .put(`/question/${id}/add-solution`)
      .send({
        input: "",
        output: "tes",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Input is required"])
        );
        done();
      });
  });

  test("400 Failed put solution - should return error if output is empty", (done) => {
    request(app)
      .put(`/question/${id}/add-solution`)
      .send({
        input: "tes",
        output: "",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Output is required"])
        );
        done();
      });
  });

  test("401 Failed put solution - should return error if access_token is null", (done) => {
    request(app)
      .put(`/question/${id}/add-solution`)
      .send({
        input: "tes",
        output: "tes",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(expect.arrayContaining(["unauthorized"]));
        done();
      });
  });
});

describe(`PUT /question/:question_id/add-sample-solution - ADD SAMPLE SOLUTION TO QUESTION || Success CASE`, () => {
  test("201 Success post question - should create new question", (done) => {
    request(app)
      .put(`/question/${id}/add-sample-solution`)
      .send({
        input: "tes",
        output: "tes",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("question_id", expect.any(String));
        expect(body).toHaveProperty("input", expect.any(String));
        expect(body).toHaveProperty("output", expect.any(String));
        done();
      });
  });
});

describe(`PUT /question/:question_id/add-sample-solution - ADD SAMPLE SOLUTION TO QUESTION || Fail CASE`, () => {
  test("400 Failed put sample solution - should return error if input is empty", (done) => {
    request(app)
      .put(`/question/${id}/add-sample-solution`)
      .send({
        input: "",
        output: "tes",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Input is required"])
        );
        done();
      });
  });

  test("400 Failed put sample solution - should return error if output is empty", (done) => {
    request(app)
      .put(`/question/${id}/add-sample-solution`)
      .send({
        input: "tes",
        output: "",
      })
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(
          expect.arrayContaining(["Output is required"])
        );
        done();
      });
  });

  test("401 Failed put sample solution - should return error if access_token is null", (done) => {
    request(app)
      .put(`/question/${id}/add-sample-solution`)
      .send({
        input: "tes",
        output: "tes",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(expect.arrayContaining(["unauthorized"]));
        done();
      });
  });
});

describe("GET /questions/ - GET QUESTION || Succes CASE", () => {
  test("200 Succes get solution - should return QUESTION", (done) => {
    request(app)
      .get(`/questions`)
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("questions", expect.any(Object));
        console.log(body.questions.solution);
        done();
      });
  });
});

describe("GET /questions/:id/solution - GET QUESTION || Succes CASE", () => {
  test("200 Succes get solution - should return QUESTION", (done) => {
    request(app)
      .get(`/questions/${id}/solution`)
      .set("access_token", initial_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("questions", expect.any(Object));
        console.log(body.questions.solution);
        done();
      });
  });
});

describe("GET /questions/ - GET QUESTION || Fail CASE", () => {
  test("401 Failed get question - should return error if access_token is null", (done) => {
    request(app)
      .get(`/questions`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(expect.arrayContaining(["unauthorized"]));
        done();
      });
  });
});

describe("DELETE /questions/:question_id - DELETE QUESTION || FAIL CASE", () => {
  test("401 fail delete question - should return fail if access_token is null", (done) => {
    request(app)
      .delete(`/questions/${id}`)
      .set("test", tes)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(expect.arrayContaining(["unauthorized"]));
        done();
      });
  });

  test("401 fail delete question - should return fail if non authorized", (done) => {
    request(app)
      .delete(`/questions/${id}`)
      .set("access_token", "asdfgt")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", expect.any(Array));
        expect(body.errors).toEqual(expect.arrayContaining(["unauthorized"]));
        done();
      });
  });
});

describe("DELETE /questions/:question_id - DELETE QUESTION || SUCCESS CASE", () => {
  test("200 success delete question - should return succes", (done) => {
    request(app)
      .delete(`/questions/${id}`)
      .set("access_token", initial_token)
      .set("test", tes)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("success", expect.any(Object));
        console.log(body, status, "ini");
        done();
      });
  });
});
