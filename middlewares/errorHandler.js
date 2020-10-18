module.exports = function errorHandler (err, req, res, next) {

    let errors = []
    let statusCode = 500

    console.log(err.name)
    // if (err.errors.email) {
    //     statusCode = 400
    //     errors.push('Email is required')
    // } else if (err.errors.name) {
    //     statusCode = 400
    //     errors.push('Name is required')
    // } else if (err.name) {
    //     statusCode = 400
    //     errors.push('Password is required')
    // } else if (err.name === 'MongoError') {
    //     statusCode = 400
    //     errors.push('Email has been used, please use another email')
    // }
    switch (err.name) {
        case 'ValidationError':
            statusCode = 400
            errors.push(err.details[0].message)
            break
        case 'MongoError':
            statusCode = 400
            errors.push('Email has been used, please use another email')
            break
        case 'InvalidEmailOrPassword':
            statusCode = 400
            errors.push('Invalid email or password')
            break
        default:
            errors.push('Internal server error')
    }
    console.log(statusCode, errors)
    res.status(statusCode).json({ errors })

}