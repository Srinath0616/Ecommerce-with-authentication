const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouters");
const index = require("./routes/index");

const expressSession = require("express-session");
const flash = require("connect-flash"); 
const dotenv = require("dotenv").config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("JWT_KEY:", process.env.JWT_KEY);
console.log("EXPRESS_SESSION_SECRET:", process.env.EXPRESS_SESSION_SECRET);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    }) // This Express Sessin is for using of flash messages, flash messages needs sessions so here we are using express Session we can also use other session if we can and expressSession is a very popular and good session so we are using it here in this project for flashes.
);
app.use(flash())

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


// app.use("/shop", (req,res)=>{
//     res.render("shop")
// })


app.use("/",index);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
});