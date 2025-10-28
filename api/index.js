require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");

const app = express();

app.use(express.json());
app.use("/api/auth", auth);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database connected.");
    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });
