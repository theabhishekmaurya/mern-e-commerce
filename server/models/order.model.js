const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "address",
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product",
      },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  status: { type: String, default: "placed", required: true },
  createdAt: { type: Date, default: Date.now() },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
});

module.exports = new mongoose.model("order", orderSchema);
