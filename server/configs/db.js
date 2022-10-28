const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  return mongoose.connect(
    "mongodb+srv://abhishek:abhishek123@cluster0.a3v1rlc.mongodb.net/?retryWrites=true&w=majority"
  );
};
