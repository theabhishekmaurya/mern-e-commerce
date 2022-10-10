const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product",
      },

      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = new mongoose.model("cart", cartSchema);
