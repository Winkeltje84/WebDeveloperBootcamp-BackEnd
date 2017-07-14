var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Matt", "Ewoud", "Dennis", "Lee", "Vanessa", "Sorry for the others but this list is getting too long..."]

app.get("/", function(req, res){
  console.log("someone visited home")
  res.render("home");
})

app.get("/friends", function(req, res){
  console.log("someone visited /friends")
  res.render("friends", { friends });
})

app.post("/friend/add", function(req, res){
  friends.push(req.body.new_friend);
  console.log(req.body.new_friend + " was added to friendlist")
  res.redirect("/friends")
})

app.listen("1111", function(){
  console.log("server running on localhost:1111");
})
