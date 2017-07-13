var express = require('express');

var app = express();

app.get("/", function(req, res){
  res.render("home.ejs");
})


app.listen("1111", function(){
  console.log("server is listening at localhost:1111");
})
