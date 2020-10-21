const User = require("../models/user");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "unauthorized" };
    else {
      const decoded = verifyToken(access_token);
      const user = await User.findOne({
        email: decoded.email,
      });
      if (!user) throw { name: "unauthorized" };
      else {
        req.loggedInUser = decoded;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
