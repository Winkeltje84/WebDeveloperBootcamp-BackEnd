var express = require("express");

var app = express();

// "/" => "hi there!"
app.get("/", function(req, res){
  console.log("someone visited the root")
  res.send("hi there!");
})

app.get("/bye", function(req, res){
  console.log("someone visited the /bye page")
  res.send("and bye again... :-(");
})

app.listen("1111", function(){
  console.log("Server running on http://localhost:1111/");
})
