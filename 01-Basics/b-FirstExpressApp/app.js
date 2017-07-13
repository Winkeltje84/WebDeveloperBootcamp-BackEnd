var express = require("express");

var app = express();

// "/" => "hi there!"
app.get("/", function(req, res){
    res.send("hi there!");
})

app.listen("1111");
