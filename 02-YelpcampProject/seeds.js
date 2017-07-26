var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
  {
    name: "CampFire",
    image: "http://media.spokesman.com/photos/2016/05/25/SRX_CAMPER_FIRE.jpg",
    description: "Hot in here..."
  },
  {
    name: "WaterCamp",
    image: "https://nathanaelvitkus.files.wordpress.com/2014/02/165ae-camping-in-the-rain.jpg",
    description: "some like it wet!"
  },
  {
    name: "BearCamp",
    image: "https://cdn-jpg2.theactivetimes.com/sites/default/files/u199306/shutterstock_78709645.jpg",
    description: "offers free wake up service"
  },
  {
    name: "DirtCamp",
    image: "http://static.fjcdn.com/pictures/Stuck+in+the+mud+camping_abcd04_3835420.jpg",
    description: "When dirt is your middlename"
  }
]

function seedDB(){
  // remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed campgrounds");
      // add some campgrounds in a callback function
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log("Could't creat campground:");
            console.log(err);
          } else {
            console.log("Added a campground from seeds...");
            Comment.create(
              {
                text: "This is an awesome camp",
                author: "Jeffrey"
              }, function(err, comment){
                if(err){
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Added a comment from seeds...");
                }
              }
            )
          }
        });
      })
    }
  })


}



module.exports = seedDB;
