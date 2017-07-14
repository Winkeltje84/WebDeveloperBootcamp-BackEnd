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

app.get("/adventures", function(req, res){
  var adventures = [
    {
      type: "backpacking",
      src: "https://www.rei.com/content/dam/images/Expert%20Advice/2016/10/Koval_100815_3900_main.jpg"
    },
    {
      type: "scuba diving",
      src: "http://www.scubadiving.com/sites/scubadiving.com/files/styles/medium_4x3/public/images/2017/06/papua_new_guinea_reef_shark_scd0617_lob_teaser.jpg?itok=mVOHOjwj&fc=50,50"
    },
    {
      type: "kitesurfing",
      src: "https://i.ytimg.com/vi/jOSsb2GgcoU/maxresdefault.jpg"
    }
  ]
  res.render("adventures.ejs", { adventures })
})

app.listen("1111", function(){
  console.log("server is listening at localhost:1111");
})
