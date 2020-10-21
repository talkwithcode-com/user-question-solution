module.exports = function errorHandler(err, req, res, next) {
  let errors = [];
  let statusCode = 500;

  switch (err.name) {
    case "ValidationError":
      statusCode = 400;
      if (err.details) {
        errors.push(err.details[0].message);
      } else {
        let object = err.errors;
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            errors.push(object[key].message);
          }
        }
      }
      break;
    case "unauthorized":
      statusCode = 401;
      errors.push(err.name);
      break;
    case "MongoError":
      statusCode = 400;
      errors.push("Email has been used, please use another email");
      break;
    case "InvalidEmailOrPassword":
      statusCode = 400;
      errors.push("Invalid email or password");
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      errors.push("unauthorized");
    default:
      errors.push("Internal server error");
  }
  // console.log(statusCode, errors)
  res.status(statusCode).json({ errors });
};
