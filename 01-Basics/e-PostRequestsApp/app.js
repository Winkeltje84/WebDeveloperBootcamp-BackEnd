var express = require("express");

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
})

app.listen("1111", function(){
  console.log("server running on localhost:1111");
})
