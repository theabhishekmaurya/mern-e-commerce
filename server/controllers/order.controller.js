const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const verifyToken = require("../utils/verifyToken");
const Razorpay = require("razorpay");
const Order = require("../models/order.model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = Number(req.body.amount);
  console.log(amount, req.body.amount);
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture,
  };
  const response = await razorpay.orders.create(options);

  return res.json({
    id: response.id,
    currency: "INR",
    amount: response.amount,
  });
});

router.post("/razorpay/success", async (req, res) => {
  const { user } = await verifyToken(req.headers.token);
  req.body.userId = user._id;
  const order = await Order.create(req.body);
  return res.send("success");
});

router.get("/success/:orderId", async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId });

  if (!order) {
    return res.status(404).send("Invalid");
  } else {
    return res.status(200).send("order-success");
  }
});

router.get("/get-order", async (req, res) => {
  const { user } = await verifyToken(req.headers.token);
  const orders = await Order.find({ userId: user._id })
    .populate("address")
    .populate("items.product");

  return res.send(orders ? orders : []);
});

module.exports = router;
