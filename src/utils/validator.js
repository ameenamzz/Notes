var validator = require("validator");

const validateSignUp = (req) => {
  const { name, email, password } = req.body;
  if (!name) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

module.exports = { validateSignUp };
