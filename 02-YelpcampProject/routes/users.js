var express       = require('express');
var User          = require("../models/user");
var Campground    = require("../models/campground");
var middleware    = require('../middleware/index');

var router = express.Router();

// GET SHOW USER PROFILE PAGE
router.get("/:id", middleware.isLoggedIn, function(req, res){
  id = req.params.id;
  console.log("GET /users/" + id + " visited --> rendering User Profile show page...")
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
          res.render("users/show", { user: foundUser, campgrounds: userCampgrounds, page: "profile" });
        }
      })
    }
  })
})

router.get("/:id/edit", middleware.checkUserEditAuthority, function(req, res){
  var id = req.params.id;
  console.log("GET /users/" + id + "/edit visited --> rendering edit page...");
  User.findById(id, function(err, foundUser){
    if(err){
      console.log("errorredirecting to 'back'...");
      console.log(err);
      req.flash("error", "error, user not found, redirecting to 'back'...")
      res.redirect("back");
    } else {
      res.render("users/edit", { user: foundUser });
    }
  })
})

router.put("/:id", middleware.checkUserEditAuthority, function(req, res){
  var user_id = req.params.id;
  var new_user_data = req.body.user;
  console.log("PUT /users/" + id + " visited --> performing edit...");
  User.findByIdAndUpdate(user_id, new_user_data, function(err, updatedUser){
    if(err){
      console.log("couldn't update user, rendering 'back'");
      console.log(err);
      res.redirect('back');
    } else {
      console.log("Succesfully edited user (profile), rendering user (profile) show view...");
      req.flash("success", "Succesfully updated user profile")
      res.redirect("/users/" + user_id);
    }
  })
})


module.exports = router;
