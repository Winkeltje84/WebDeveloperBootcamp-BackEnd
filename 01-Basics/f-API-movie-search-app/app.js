var express = require('express')
var request = require('request')

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.redirect("/search");
})

app.get("/search", function(req, res){
  res.send("we use this page to get search request");
})

app.get("/result", function(req, res){
  request("http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb", function(error, response, body){
    if(!error && response.statusCode == 200){
      var results = JSON.parse(body)
      res.send(results["Search"][0]);
    }
  });
})

app.get("*", function(req, res){
  res.send("Sorry, page not found... What are you doing with your life?");
})

app.listen("1111", function(){
  console.log("server running on localhost:1111");
})
