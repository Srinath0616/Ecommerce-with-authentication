const mongoose = require("mongoose");

const dbgr = require("debug")("development:mongoose");
// Here we've saved these environment variable(development:mongoose) in the memory itself so no one can ever acess or read these even if they get access to your personal computer

mongoose
  .connect("mongodb://127.0.0.1:27017/Ecomm")
  // .connect(process.env.MONGODB_URI) // Add process.env.PORT Here when pushing to git
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });
module.exports = mongoose.connection;
