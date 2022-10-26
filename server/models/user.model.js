const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    mobile: { type: Number },
    password: { type: String, required: true },
    type: { type: String, required: true, default: "customer" },
    profilePic: { type: String },
    verified: { type: Boolean, default: false },
    sellerReq: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = new mongoose.model("user", userSchema);
