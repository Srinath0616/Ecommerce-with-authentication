const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const isLoggedIn = require("../middlewares/isLoggedIn");

// console.log(process.env.NODE_ENV)
// Here we've saved these environment variable in the memory itself so no one can ever acess or read these even if they get access to your personal computer, So this works only till the development

router.post("/create",isLoggedIn, async function (req, res) {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res.status(404).send("Unauthorized access");
  }
  let { fullname, email, password, gstin } = req.body;
  let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
    gstin,
  });
  res.status(201).send(createdOwner);
});
// When environment variable(NODE_ENV ) is set to development then only it'll work else it won't work if it is production or even if it is set to nothing

router.get("/admin",isLoggedIn, function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
