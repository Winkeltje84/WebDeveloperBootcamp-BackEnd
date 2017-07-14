var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  console.log("someone visited home")
  res.render("home");
})

app.get("/friends", function(req, res){
  console.log("someone visited /friends")
  var friends = ["Matt", "Ewoud", "Dennis", "Lee", "Vanessa", "Sorry for the others but this list is getting too long..."]
  res.render("friends", { friends });
})

app.post("/friend/add", function(req, res){
  res.send("you have reached the post route, you would like to add " + req.body.new_friend)
})

app.listen("1111", function(){
  console.log("server running on localhost:1111");
})
