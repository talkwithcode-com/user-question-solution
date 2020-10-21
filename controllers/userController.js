const User = require("../models/user");
const UserJoi = require("../models/userJoi");
const { hashPass, comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      let payload = req.body;
      const check = UserJoi.validate(payload);
      if (check.error) throw check.error;
      payload.password = hashPass(payload.password);
      const newUser = new User({ ...payload });
      await newUser.save();
      res.status(201).json({
        statusCode: 201,
        msg: "Register success",
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) throw { name: "InvalidEmailOrPassword" };
      if (!comparePass(password, user.password))
        throw { name: "InvalidEmailOrPassword" };
      let payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
      };
      let access_token = generateToken(payload);
      res.status(200).json({
        msg: "Login success",
        name: user.name,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
};
