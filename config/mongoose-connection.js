const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");
// Here we've saved these environment variable(development:mongoose) in the memory itself so no one can ever acess or read these even if they get access to your personal computer

mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    dbgr("Connected to db");
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
