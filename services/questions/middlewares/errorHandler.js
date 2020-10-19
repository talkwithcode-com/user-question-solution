function errorHandler(err, req, res, next) {
    let errors = []
    let statusCode = 500

    console.log(err.errors, "ini")
    switch (err.name) {

        case "ValidationError":

            statusCode = 400
            let object = err.errors
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    errors.push(object[key].message)
                }
            }
            break;
        default:
            errors.push(err.msg)
            statusCode = (err.statusCode)
    }
    res.status(statusCode).json({ errors })
}


module.exports = errorHandler