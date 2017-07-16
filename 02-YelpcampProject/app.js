var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
  { name: "Watercamp", image:"https://s-media-cache-ak0.pinimg.com/originals/7a/b2/88/7ab288fc21daf71f7fa73e6f87254887.jpg"},
   function(err, campground){
     if(err){
       console.log(err);
     } else {
       console.log("Newly created campground: ");
       console.log(campground);
     }
   }
)

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
