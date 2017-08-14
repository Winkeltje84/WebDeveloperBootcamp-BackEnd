var express = require('express');
var User = require('../models/user');
var middleware = require('../middleware/index');

var router = express.Router();



// GET USERS INDEX PATH
router.get("/", function(req, res){
  res.send("users path reached");
})
//
// router.get("/", function(req, res){
//   console.log("GET /campgrounds visited")
//   Campground.find({}, function(err, campgrounds){
//     if(err){
//       console.log(err)
//     } else {
//       res.render("campgrounds/index", {campgrounds: campgrounds, page: 'campgrounds'});
//     }
//   })
// })
//


module.exports = router;
