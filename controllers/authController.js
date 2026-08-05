const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/genereteToken");
const flash = require("connect-flash");

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "You have an existing account, Try to Login");
      return res.redirect("/");
    }

    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.render("Home");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Correct Email and Password is required");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      // res.send("Yo loogged In");
      console.log("Redirecting to Shop Page")
      return res.redirect("/Home"); // Remember When we use redirect if you are at x route and try to do redirect("y") then it will reach /x/y.com url but if you do redirect("/y") then /y.com url will be reached
    } else {
      req.flash("error", "Something is Wrong");
      return res.redirect("/");
    }
  });
};
module.exports.logOut = async function(req,res){
  res.cookie("token","");
  return res.redirect("/");
}