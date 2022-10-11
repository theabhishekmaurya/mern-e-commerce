const express = require("express");
const Address = require("../models/address.model");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");

router.get("", async (req, res) => {
  try {
    const user = await verifyToken(req.headers.token);
    const address = await Address.findOne({ userId: user.user._id });
    res.send(address ? address.addresses : []);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("", async (req, res) => {
  try {
    const user = await verifyToken(req.headers.token);
    const address = await Address.findOne({ userId: user.user._id });
    if (address) {
      await Address.updateOne(
        { userId: user.user._id },
        {
          addresses: [...address.addresses, req.body],
        }
      );
    } else {
      await Address.create({
        userId: user.user._id,
        addresses: [req.body],
      });
    }
    res.send({ msg: "address added" });
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
