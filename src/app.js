const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB()
  .then(() => {
    console.log("DB connection established succesfully...");
    app.listen(4000, () => {
      console.log("Example app listening on port 4000...");
    });
  })
  .catch((err) => console.log(err));
