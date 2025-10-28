require("dotenv").config();

const express = require("express");
const auth = require("./routes/auth");

const app = express();
app.use(express.json());

app.use("/api/auth", auth);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
