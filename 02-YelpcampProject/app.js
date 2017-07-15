var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
  { name: "Salmon Creek", image: "https://amsterdam.jekuntmeer.nl/imagehandler/contenttop/ykOjC-7deugden.png"},
  { name: "Granite Hill'", image: "http://www.brouwerijhetij.nl/wp-content/uploads/2015/05/Logo-t-IJ_web.jpg"},
  { name: "Mountain Goat's Rest", image:"http://www.hop-in.nl/wp-content/uploads/2016/02/Brouwerij-De-Leckere.png"},
]

app.get("/", function(req, res){
  console.log("GET ROOT visted")
  res.render("home");
})

app.get("/campgrounds", function(req, res){
  console.log("GET /campgrounds visited")
  res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
  console.log("POST /campgrounds visited");
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name, image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
  console.log("GET /campgrounds/new visited")
  res.render("new");
})

app.get("*", function(req, res){
  console.log("GET 'none existend' url visited")
  res.send("Sorry, you ended at a nonexistend url...")
})

app.listen("1111", function(){
  console.log("server running on http://localhost:1111");
})
