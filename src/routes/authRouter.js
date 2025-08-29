const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cookieSession = require("cookie-session");
const { validateSignUp } = require("../utils/validator");

authRouter.post("/singup", async (req, res) => {
  try {
    validateSignUp(req);
    const { name, email, password } = req.body;
    const userExist = await User.findOne({
      email: email,
    });

    if (userExist) {
      throw new Error("User already Exist");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    await user.save();
    res.json("user created successfully!");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      throw new Error("user not valid");
    }
    const passwordHash = user.password;
    const passwordCheck = await bcrypt.compare(password, passwordHash);
    if (!passwordCheck) {
      throw new Error("invalid password");
    }
    var token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.json({
      success: true,
      message: "log in Successfull",
      user,
    });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.json("Singed Out successfully");
});

module.exports = authRouter;
