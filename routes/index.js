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

  let quantity = {};
  let uniqueProducts = [];

  user.cart.forEach((product) => {
    let id = product._id.toString();

    if (quantity[id]) {
      quantity[id]++;
    } else {
      quantity[id] = 1;
      uniqueProducts.push(product);
    }
  });

  let success = req.flash("success");

  res.render("cart", {
    user,
    success,
    quantity,
    uniqueProducts,
  });
});

router.get("/removefromcart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart = user.cart.filter(
    (product) => product.toString() !== req.params.productid,
  );
  await user.save();
  req.flash("success", "Removed From Cart");
  res.redirect("/shop");
});
router.get("/increaseCount/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  user.cart.push(req.params.productid);

  await user.save();

  res.redirect("/cart");
});
router.get("/decreaseCount/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  let index = user.cart.findIndex(
    (product) => product.toString() === req.params.productid,
  );

  if (index !== -1) {
    user.cart.splice(index, 1);
  }

  await user.save();

  res.redirect("/cart");
});
// router.get("/shop", isLoggedIn, function (req, res) {
//   res.render("shop");
// });

module.exports = router;
