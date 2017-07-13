var express = require("express");

var app = express();

// "/" => "hi there!"
app.get("/", function(req, res){
    res.send("hi there!");
})

app.listen("1111", function(){
  console.log("Server running on http://localhost:1111/");
});
