var express = require('express')
var request = require('request')

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.redirect("/search");
})

app.get("/search", function(req, res){
  res.send("succes!");
})

app.get("*", function(req, res){
  res.send("Sorry, page not found... What are you doing with your life?");
})

app.listen("1111", function(){
  console.log("server running on localhost:1111");
})
