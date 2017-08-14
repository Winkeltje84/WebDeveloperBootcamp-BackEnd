var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require("./models/user"),
    seedDB = require('./seeds'),
    methodOverride = require('method-override');

var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index"),
    userRoutes        = require("./routes/users");

mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Camping actually sucks, just kidding ;-)",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.message_error = req.flash("error");
  res.locals.message_success = req.flash("success");
  res.locals.message_info = req.flash("info");
  next();
})

// IMPORT ROUTES
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/users", userRoutes);
app.use(indexRoutes);

// RUN SERVER
app.listen("1111", function(){
  console.log("server running on http://localhost:1111");
})
