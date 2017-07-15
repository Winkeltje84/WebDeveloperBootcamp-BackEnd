var express = require('express')
var request = require('request')

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("search");
})

app.get("/results", function(req, res){
  console.log(req.query)
  var search_term = req.query.search_term;
  var api_search_url = "http://www.omdbapi.com/?apikey=thewdb&s=" + search_term
  request(api_search_url, function(error, response, body){
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
