const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/authRouter");
require("dotenv").config();
var cookieParser = require("cookie-parser");
const profileRouter = require("./routes/profileRouter");
const notesRouter = require("./routes/NotesRouter");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use(profileRouter);
app.use(notesRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
connectDB()
  .then(() => {
    console.log("DB connection established succesfully...");
    app.listen(4000, () => {
      console.log("app listening on port 4000...");
    });
  })
  .catch((err) => console.log(err));
