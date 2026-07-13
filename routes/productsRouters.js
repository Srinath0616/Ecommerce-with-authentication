const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor, // You cannot miss writing here cause if you don't write here the mongo will assume that there is no value for this by that means that variable won't be pushed to db then its useless to get as req. So don't miss writing here 
      textcolor,
    });
    req.flash("success","Product Created Successfully!!")
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = router;
