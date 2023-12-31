const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log("===============err===============", err);
    });
};

module.exports = connectDB;
