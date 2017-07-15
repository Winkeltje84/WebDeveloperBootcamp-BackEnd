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

app.get("/results", function(req, res){
  request("http://www.omdbapi.com/?s=amsterdam&apikey=thewdb", function(error, response, body){
    if(!error && response.statusCode == 200){
      var results = JSON.parse(body)["Search"];
      console.log(results)
      res.render("results", { data: results });
    }
  });
})

app.get("*", function(req, res){
  res.send("Sorry, page not found... What are you doing with your life?");
})

app.listen("1111", function(){
  console.log("server running on localhost:1111");
})
