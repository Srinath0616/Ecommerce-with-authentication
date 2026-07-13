const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/genereteToken");
const { registerUser, loginUser,logOut } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/users",(req,res)=>{
    res.send("Users page")
})

router.post("/register", registerUser);

router.post("/login",loginUser);


router.get("/admin",(req,res)=>{
    res.render("admin");
});

router.get("/logout",isLoggedIn, logOut);
module.exports = router;
