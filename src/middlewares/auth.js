var jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token invalid");
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const user = await User.findOne({
      email: email,
    });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {userAuth}
