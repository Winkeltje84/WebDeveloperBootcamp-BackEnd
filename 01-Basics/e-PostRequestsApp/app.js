var express = require("express");

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
})

app.get("/friends", function(req, res){
  var friends = ["Matt", "Ewoud", "Dennis", "Lee", "Vanessa", "Sorry for the others but this list is getting too long..."]
  res.render("friends", { friends });
})

app.listen("1111", function(){
  console.log("server running on localhost:1111");
})
