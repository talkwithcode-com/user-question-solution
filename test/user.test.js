const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('mongoose')
const databaseName = 'user-question-solution'

const userData = {
    name: 'Ajihans',
    email: "tes@mail.com",
    password: "tes123"
}

// beforeAll(async (done) => {
//     const url = `mongodb://127.0.0.1/${databaseName}`
//     await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//     done()
// })

afterAll(async (done) => {
    await User.deleteMany({})
    done()
})

describe('Register || Success Case', () => {
    test('Should send object with keys: message, statusCode, id, email & name', (done) => {
        request(app)
            .post('/users/register')
            .send(userData)
            .end(function (err, res) {
                if (err) throw err
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('msg', 'Register success')
                expect(res.body).toHaveProperty('statusCode', 201)
                expect(res.body).toHaveProperty('_id', expect.any(String))
                expect(res.body).toHaveProperty('email', userData.email)
                expect(res.body).toHaveProperty('name', userData.name)
                expect(res.body).not.toHaveProperty('password')
                done()
            })
    })
})

describe('Register || Fail Case', () => {
    test('Fail because email is undefined', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: "",
            name: 'ajiha',
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"email" is not allowed to be empty' ]))
            done()
        })
    })
    test('Fail because email is null', (done) => {
        request(app)
        .post('/users/register')
        .send({
            name: 'ajiha',
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"email" is required' ]))
            done()
        })
    })
    test('Fail because email has wrong input type', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 1,
            name: 'ajiha',
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"email" must be a string' ]))
            done()
        })
    })
    test('Fail because email format is wrong', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 'haha',
            name: 'ajiha',
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"email" must be a valid email' ]))
            done()
        })
    })
    test('Fail because name is undefined', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 'tes123@mail.com',
            name: '',
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"name" is not allowed to be empty' ]))
            done()
        })
    })
    test('Fail because name is null', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 'tes123@mail.com',
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"name" is required' ]))
            done()
        })
    })
    test('Fail because email has wrong input type', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 'tes@mail.com',
            name: 1,
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"name" must be a string' ]))
            done()
        })
    })
    test('Fail because password is undefined', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 'tes123@mail.com',
            name: 'ajiha',
            password: ''
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"password" is not allowed to be empty' ]))
            done()
        })
    })
    test('Fail because password is null', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 'tes123@mail.com',
            name: 'ajiha'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ '"password" is required' ]))
            done()
        })
    })
    test('Fail because email duplicate', (done) => {
        request(app)
        .post('/users/register')
        .send({
            email: 'tes@mail.com',
            name: 'ajiha',
            password: 'secret'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining([ 'Email has been used, please use another email' ]))
            done()
        })
    })
})

describe('Login || Success Case', () => {
    test('Should send object with keys: message, statusCode, id, email & name', (done) => {
        request(app)
            .post('/users/login')
            .send(userData)
            .end(function (err, res) {
                if (err) throw err
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('msg', 'Login success')
                expect(res.body).toHaveProperty('name', userData.name)
                expect(res.body).toHaveProperty('access_token')
                expect(res.body).not.toHaveProperty('password')
                done()
            })
    })
})

describe('Login || Fail case', () => {
    test('Email is null', (done) => {
        request(app)
            .post('/users/login')
            .send({ password: 'secret' })
            .end(function (err, res) {
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining([ 'Invalid email or password' ]))
                done()
            })
    })
    test('Email is empty', (done) => {
        request(app)
            .post('/users/login')
            .send({ 
                email: '',
                password: 'secret'
            })
            .end(function (err, res) {
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining([ 'Invalid email or password' ]))
                done()
            })
    })
    test('Email is invalid', (done) => {
        request(app)
            .post('/users/login')
            .send({ 
                email: 'haha@mail.com',
                password: 'secret'
            })
            .end(function (err, res) {
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining([ 'Invalid email or password' ]))
                done()
            })
    })
    // test('Password is null', (done) => {
    //     request(app)
    //         .post('/users/login')
    //         .send({ email: 'tes@mail.com' })
    //         .end(function (err, res) {
    //             if (err) throw err
    //             expect(res.status).toBe(400)
    //             expect(res.body).toHaveProperty('errors', expect.any(Array))
    //             expect(res.body.errors).toEqual(expect.arrayContaining([ 'Invalid email or password' ]))
    //             done()
    //         })
    // })
    test('Password is empty', (done) => {
        request(app)
            .post('/users/login')
            .send({ 
                email: 'test@mail.com',
                password: ''
            })
            .end(function (err, res) {
                if (err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining([ 'Invalid email or password' ]))
                done()
            })
    })
})