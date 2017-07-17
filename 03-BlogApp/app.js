var express     = require('express');
var request     = require('request');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var app = express();
app.use(express.static("public")) //using public folder for custom style sheet
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/blog_app");

app.set("view engine", "ejs");

app.get("/", function(req, res){
  console.log("GET '/' visted");
  res.render("home");
})

app.get("*", function(req, res){
  console.log("GET 'none existend' url visited");
  res.send("Sorry, you ended at a nonexistend url...");
})

app.listen("1111", function(){
  console.log("Server running on http://localhost:1111");
})
