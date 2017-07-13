var express = require('express');

var app = express();

app.get("/", function(req, res){
  console.log("success!");
  res.send("Hi there, welcome to my assignment!")
})

app.get("/speak/:animal", function(req, res){
  var animal = req.params.animal.toLowerCase();
  var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!"
  }
  var sound = sounds[animal]
  if (sound){
    res.send("The " + animal + " says '" + sound + "'");
  } else {
    res.send("Sorry, page not found... What are you doing with your life?");
  }
})

app.get("/repeat/:word/:number", function(req, res){
  var word = req.params.word;
  var number = Number(req.params.number);
  var wordRepeat = "";
  for(i = 0; i < number; i++){
    wordRepeat += (" " + word);
  }
  res.send(wordRepeat);
})

app.get("*", function(req, res){
  res.send("Sorry, page not found... What are you doing with your life?");
})

app.listen("9999", function(){
  console.log("server 9999 is running!");
})
