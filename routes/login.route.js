var express = require("express");
var Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require('connect-flash');
const { render } = require("ejs");

var Login_router = express.Router();

Login_router.use(flash());

Login_router.get("/",function(req,res){
    var mess = req.flash()
    res.render("./admin/login",{err:mess})
});

Login_router.post("/",Passport.authenticate("local",{failureFlash:true,
                                                    failureRedirect:"/login-admin",
                                                    successRedirect:"/admin"}));

module.exports = Login_router
