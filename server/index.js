const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userController = require("./controllers/user.controller");
const adminController = require("./controllers/admin.controller");
const cartController = require("./controllers/cart.controller");
const addressController = require("./controllers/address.controller");
const orderController = require("./controllers/order.controller");
const connect = require("./configs/db");
const path = require("path");

const PORT = process.env.port || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/test", (req, res) => {
  res.send("test");
});

app.use(express.json());
app.use("/users", userController);
app.use("/admin", adminController);
app.use("/cart", cartController);
app.use("/address", addressController);
app.use("/order", orderController);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening at ${PORT}`);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = app;
