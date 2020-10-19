const app = require('../app.js')
const request = require('supertest')
// const mongoose = require('mongoose');
// const QuestionModel = require('../models/Question')





describe(`POST /question - CREATE DATA QUESTION`, () => {

    test('201 Success post question - should create new question', (done) => {
        request(app)
            .post('/questions')
            .send(
                {
                    title: "tes",
                    score: "stringtes",
                    description: "string",
                    user_id: "string"
                }
            )
            .then(response => {
                const { body, status } = response
                console.log(body)
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', "create the question successful")
                done()
            })
    })

    test('400 Failed post question - should return error if title is empty', (done) => {
        request(app)
            .post('/questions')
            .send(
                {
                    title: "",
                    score: "stringtes",
                    description: "string",
                    user_id: "string"
                }
            )
            // .set('access_token', userToken)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', expect.any(Array))
                expect(body.errors).toEqual(expect.arrayContaining(["Title is required"]))
                done()
            })
    })

    test('400 Failed post question - should return error if score is empty', (done) => {
        request(app)
            .post('/questions')
            .send(
                {
                    title: "tes",
                    score: "",
                    description: "string",
                    user_id: "string"
                }
            )
            // .set('access_token', userToken)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', expect.any(Array))
                expect(body.errors).toEqual(expect.arrayContaining(["Score is required"]))
                done()
            })
    })

    test('400 Failed post question - should return error if score is empty', (done) => {
        request(app)
            .post('/questions')
            .send(
                {
                    title: "tes",
                    score: "",
                    description: "string",
                    user_id: "string"
                }
            )
            // .set('access_token', userToken)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', expect.any(Array))
                expect(body.errors).toEqual(expect.arrayContaining(["Score is required"]))
                done()
            })
    })

    test('400 Failed post question - should return error if score is empty', (done) => {
        request(app)
            .post('/questions')
            .send(
                {
                    title: "tes",
                    score: "tes",
                    description: "",
                    user_id: "string"
                }
            )
            // .set('access_token', userToken)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', expect.any(Array))
                expect(body.errors).toEqual(expect.arrayContaining(["Description is required"]))
                done()
            })
    })
})