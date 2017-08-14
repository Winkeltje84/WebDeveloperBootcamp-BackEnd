var express = require('express');
var User    = require("../models/user");

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
      res.render("users/show");
    }
  })
})

module.exports = router;
