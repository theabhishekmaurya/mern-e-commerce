const express = require("express");
require("dotenv").config();
const cors = require("cors")
const userController = require("../controllers/user.controller");

const connect = require("../configs/db");

const PORT = process.env.port || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/users", userController);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening at ${PORT}`);
  } catch (e) {
    console.log(e.message);
  }
});
