const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  addLine1: { type: String, required: true },
  addLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
});

module.exports = new mongoose.model("address", addressSchema);
