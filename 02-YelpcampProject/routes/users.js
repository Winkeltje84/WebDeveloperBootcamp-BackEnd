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

module.exports = router;
