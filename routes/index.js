const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});
router.get("/Home", isLoggedIn, (req, res) => {
  res.render("Home");
});
router.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  res.render("Profile", { user });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});
router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel
  .findOne({ email: req.user.email })
  .populate("cart");
  let success = req.flash("success");
  res.render("cart", { user, success });
});

router.get("/removefromcart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart = user.cart.filter(
    product => product.toString() !== req.params.productid
  );
  await user.save();  
  req.flash("success","Removed From Cart");
  res.redirect("/shop");
});
// router.get("/shop", isLoggedIn, function (req, res) {
//   res.render("shop");
// });

module.exports = router;
