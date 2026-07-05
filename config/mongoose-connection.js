const mongoose = require("mongoose");

mongoose
.connect("mongodb://127.0.0.1:27017/Ecomm")
.then(function(){
    console.log("Connected to db");
}).catch(function(err){
    console.log(err);
});

module.exports = mongoose.connection;