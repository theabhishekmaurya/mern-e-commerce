const express = require("express");
const Address = require("../models/address.model");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");

router.get("", async (req, res) => {
  try {
    const { user } = await verifyToken(req.headers.token);
    const address = await Address.find({ userId: user._id });
    res.send(address ? address : []);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("", async (req, res) => {
  try {
    const { user } = await verifyToken(req.headers.token);
    req.body.userId = user._id;
    await Address.create(req.body);
    res.send({ msg: "address added" });
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
