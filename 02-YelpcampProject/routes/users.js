var express = require('express');
var User    = require("../models/user");
var Campground    = require("../models/campground");

var router = express.Router();

// GET SHOW USER PROFILE PAGE
router.get("/:id", function(req, res){
  id = req.params.id;
  console.log("GET /user/" + id + " visited --> rendering User Profile show page...")
  User.findById(id, function(err, foundUser){
    if(err){
      console.log("Oops, there was an error...");
      res.redirect("/campgrounds");
    } else {
      console.log(foundUser)
      Campground.find().where('user.id').equals(foundUser._id).exec(function(err, userCampgrounds){
        if(err){
          console.log("error, could not find campgrounds of user");
          req.flash("error", "something went wrong");
          res.redirect("/campgrounds");
        } else {
          res.render("users/show", { user: foundUser, campgrounds: userCampgrounds });
        }
      })
    }
  })
})

module.exports = router;
