const mongoose = require("mongoose");

const userScehema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      minlength: 2,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    autoIndex: true,
    timestamps: true,
  }
);

const User = mongoose.model("User", userScehema);
module.exports = User;
