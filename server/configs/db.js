const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  return mongoose.connect(process.env.DB_CONNECT);
};
