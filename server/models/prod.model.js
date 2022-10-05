const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    seller: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("product", productSchema);
