var express = require('express');
var User = require('../../models/user');
var middleware = require('../../middleware/index');

var router = express.Router();

// GET USERS INDEX PATH
router.get("/", middleware.checkIfAdmin, function(req, res){
  console.log("GET /users visited");
  User.find({}, function(err, foundUsers){
    if(err){
      console.log("an error occured finding users");
      console.log(err);
    } else {
      res.render("admin/users/index", { users: foundUsers});
    }
  })
})

// GET EDIT (USER) --> render the edit form for a specific user
router.get("/:id/admin_status/edit", middleware.checkUserEditAuthority, function(req, res){
  var id = req.params.id;
  console.log("GET admin/user/" + id + "/admin_status/edit visited --> rendering admin status edit page by Admin...");
  User.findById(id, function(err, foundUser){
    if(err){
      console.log("error, user not found, redirecting to '/users'...");
      req.flash("error", "error, user not found, redirecting to '/admin/users'...")
      res.redirect("/admin/users");
    } else {
      res.render("admin/users/adminStatusEdit", { user: foundUser });
    }
  })
})

router.put("/:id/admin_status", middleware.checkIfAdmin, function(req, res){
  var id = req.params.id;
  console.log("PUT admin/user/" + id + "/admin_status visited --> saving new Admin Status user...")
  var edited_user = {
    isAdmin: req.body.user.isAdmin
  };
  User.findByIdAndUpdate(id, edited_user, function(err, updatedUser){
    if(err){
      console.log("error, could not update user, redirecting to '/users'");
      req.flash("error", "Oops, something went wrong, could not update user")
      res.redirect("/users");
    } else {
      console.log("Succesfully updated Admin Status user, rendering '/users'");
      req.flash("success", "Succesfully updated Admin Status user");
      res.redirect("/admin/users");
    }
  })
})

module.exports = router;
