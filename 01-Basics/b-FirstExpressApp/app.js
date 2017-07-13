var express = require("express");

var app = express();

// "/" => "hi there!"
app.get("/", function(req, res){
  console.log("someone visited the root")
  res.send("Welcome to the animal page! Please use path '/animals/:kind' for your type of animal!");
})

app.get("/animals/:kind", function(req, res){
  var requested = req.params.kind;
  console.log("someone visited the '/animals/:" + requested + "' path");
  console.log(req.params)
  res.send("Welcom to the "  + requested + " page!");
})

app.get("*", function(req, res){
  console.log("someone tried to visit a none existing page")
  res.send("Error! This page does not exist!")
})

app.listen("1111", function(){
  console.log("Server running on http://localhost:1111/");
})
