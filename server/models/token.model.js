const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  token: { type: String, require: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 },
});

module.exports = new mongoose.model("token", TokenSchema);
