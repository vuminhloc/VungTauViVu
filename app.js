var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session")
var Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var Admin = require("./model/admin.model");
var port = 4000;
var flash =  require('connect-flash');
var TourRoutes = require("./routes/tours.route")
var loginRoutes = require("./routes/login.route")
var AdminRoutes = require("./routes/admin.route")
var check = require("./middleware/login.middleware");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret:"mysecrect",
    cookie:{
        maxAge:1000*60*60*12
    }
}))
app.use(flash())
app.use(Passport.initialize());
app.use(Passport.session(
    { secret: 'Admon' }
));
app.use("/assets",express.static(__dirname + "/public"));

app.set("view engine","ejs");


app.get("/",function(req,res){
    console.dir(req.ip)
    res.render("home")
});

app.use("/hotels",require('./routes/hotels.route'))

app.get("/services",function(req,res){
    res.render("services")
})
app.get("/",function(req,res){
    req.status(404).res.send("Not found")
})
app.use("/blog",require('./routes/blog.router'));

app.get("/about",function(req,res){
    res.render("about")
})
app.get("/contact",function(req,res){
    res.render("contact")
})
app.use("/tours",TourRoutes);

app.use("/admin",check.checklogin,AdminRoutes);

app.use("/login-admin",loginRoutes);

app.use(function(req,res,next){
    res.render("404")
});

// __________________________________________________passport____________________________________________________________

Passport.use(new LocalStrategy(
    (username, password, done)=>{
        Admin.findOne({ Account: username }, function(err, user) {
            if(err){
                console.log(err)
            }
            if (user == null || user == undefined) {
                return done(null, false,{ message: 'Validation Error' });
            }
            if (user.Account !== username) {
                return done(null, false,{ message: 'Incorrect username or password' });
            }
            if (user.Password !== password) {
                return done(null, false, { message: 'Incorrect username or password' });
            }
            return done(null, user);
        });
    }
));

Passport.serializeUser((user,done)=>{
    done(null,user._id)
})

Passport.deserializeUser((name,done)=>{
    Admin.findById(name, function(err, user){
        done(err, user);
    });
})

app.listen(port, function(){
    console.log("Server is listening port:",port);
})
