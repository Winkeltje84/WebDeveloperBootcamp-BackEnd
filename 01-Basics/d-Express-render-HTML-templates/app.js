var express = require('express');

var app = express();

app.get("/", function(req, res){
  res.render("home.ejs");
})

app.get("/sports/:sport", function(req, res){
  var sport = req.params.sport;
  console.log(sport)
  res.render("sport.ejs", { sport: sport });
})

app.listen("1111", function(){
  console.log("server is listening at localhost:1111");
})
