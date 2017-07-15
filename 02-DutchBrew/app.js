var express = require('express');
var request = require('request');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
})

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    { name: "Salmon Creek", image: "https://amsterdam.jekuntmeer.nl/imagehandler/contenttop/ykOjC-7deugden.png"},
    { name: "Granite Hill'", image: "http://www.brouwerijhetij.nl/wp-content/uploads/2015/05/Logo-t-IJ_web.jpg"},
    { name: "Mountain Goat's Rest", image:"http://www.hop-in.nl/wp-content/uploads/2016/02/Brouwerij-De-Leckere.png"},
  ]
  res.render("campgrounds", {campgrounds: campgrounds});
})

app.get("*", function(req, res){
  res.send("Sorry, you ended at a nonexistend url...")
})

app.listen("1111", function(){
  console.log("server running on http://localhost:1111");
})
