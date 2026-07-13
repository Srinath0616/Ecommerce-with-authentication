const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","Bro login first and come to this page ok!!");
        return res.redirect("/"); // Flash can be accessed wherever we are redirecting the route if not met the conditions,So it can be useful in both the routes and it is powerful
    }
    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        req.user = user;
        next();
    } catch(err){
        req.flash("error","Something is not good");
        return res.redirect("/");
    }
}