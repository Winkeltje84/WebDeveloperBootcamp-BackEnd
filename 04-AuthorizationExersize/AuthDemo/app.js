var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app")

var app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render("home");
})

app.get("/secret", function(req, res){
  res.render("secret");
})

app.listen("1111", function(){
  console.log("server is running on //localhost:1111");
})
