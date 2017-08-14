var express = require('express');
var User = require('../models/user');
var middleware = require('../middleware/index');

var router = express.Router();

// GET USERS INDEX PATH
router.get("/", middleware.checkIfAdmin, function(req, res){
  console.log("GET /users visited");
  User.find({}, function(err, foundUsers){
    if(err){
      console.log("an error occured finding users");
      console.log(err);
    } else {
      console.log(foundUsers);
      res.render("users/index", { users: foundUsers});
    }
  })
})

// GET EDIT (USER) --> render the edit form for a specific user
router.get("/:id/edit", middleware.checkIfAdmin, function(req, res){
  var id = req.params.id;
  console.log("GET /user/" + id + "/edit visited --> rendering edit page...");
  User.findById(id, function(err, foundUser){
    if(err){
      console.log("error, user not found, redirecting to '/users'...");
      req.flash("error", "error, user not found, redirecting to '/users'...")
      res.redirect("/users");
    } else {
      console.log(foundUser);
      res.render("users/edit", { user: foundUser });
    }
  })
})


router.put("/:id", middleware.checkIfAdmin, function(req, res){
  var id = req.params.id;
  var edited_user = {
    username: req.body.user.username,
    isAdmin: req.body.user.isAdmin
  };
  User.findByIdAndUpdate(id, edited_user, function(err, updatedUser){
    if(err){
      console.log("error, could not update user, redirecting to '/users'");
      req.flash("error", "Oops, something went wrong, could not update user")
      res.redirect("/users");
    } else {
      console.log("Succesfully updated user, rendering '/users'");
      req.flash("succes", "Succesfully updated user");
      res.redirect("/users");
    }
  })
})

module.exports = router;
