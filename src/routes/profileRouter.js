const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

module.exports = profileRouter;
