const express = require("express");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/user.model");
const Product = require("../models/prod.model");
const router = express.Router();

router.get("/verify", async (req, res) => {
  try {
    const user = await verifyToken(req.headers.token);
    return res.send(user.user.type);
  } catch (error) {
    return res.send(error.msg);
  }
});

router.post("/add-user", async (req, res) => {
  try {
    req.body.verified = true;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User Exists");
    } else {
      await User.create(req.body);
      return res.status(200).send("User added");
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/get-sellers", async (req, res) => {
  try {
    const { user } = await verifyToken(req.headers.token);

    if (user.type === "seller") {
      return res.send([{ name: user.firstName + user.lastName }]);
    }
    const sellers = await User.find({ type: "seller" });
    const sellerNames = sellers.map((seller) => {
      return { name: seller.firstName };
    });
    return res.send(sellerNames);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/add-product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.send(product);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/show-products", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();
    return res.send(products);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/show-users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/approve-seller/:email", async (req, res) => {
  try {
    await User.updateOne(
      { email: req.params.email },
      { sellerReq: false, type: "seller" }
    );
    return res.status(200).send("Updated");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
