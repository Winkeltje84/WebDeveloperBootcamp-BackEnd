var express = require('express');
var Campground = require('../models/campground');
var middleware = require('../middleware/index');
var geocoder = require('geocoder');

var router = express.Router();

// GET CAMPGROUNDS INDEX PATH
router.get("/", function(req, res){
  console.log("GET /campgrounds visited")
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds, page: 'campgrounds'});
    }
  })
})

// POST CAMPGROUND --> creating new campground
router.post("/", middleware.isLoggedIn, function(req, res){
  console.log("POST /campgrounds visited");
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var description = req.body.description;
  var user = {
      id: req.user._id,
      username: req.user.username
  };
  geocoder.geocode(req.body.location, function(err, data){
    if(err){
      console.log(err);
    } else {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
    }
    var newCampground = {
      name: name,
      image: image,
      price: price,
      location: location,
      lat: lat,
      lng: lng,
      description: description,
      user: user
    }
    Campground.create(newCampground, function(err, newCampground){
      if(err){
        console.log("Couldn't create campground:");
        req.flash("error", "Something went wrong, couldn't create Campground");
        console.log(err);
      } else {
        console.log("Newley created campground:");
        console.log(newCampground);
        req.flash("success", "Succesfully created a campground")
        res.redirect("/campgrounds");
      }
    });
  })
});

// GET NEW (CAMPGROUND) --> rendering form for new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  console.log("GET /campgrounds/new visited")
  res.render("campgrounds/new");
})

// GET SHOW (CAMPGROUND) --> show page of particular campground
router.get("/:id", function(req, res){
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log("Error, no such Campground found");
      console.log(err);
    } else {
      console.log("User visits a Campground show page:");
      console.log(foundCampground);
      res.render("campgrounds/show", { campground: foundCampground});
    }
  })
})

// GET EDIT (CAMPGROUND) --> show edit page of particular campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  id = req.params.id;
  console.log("GET /campgrounds/" + id + "/edit visited --> rendering edit page...")
  Campground.findById(id, function(err, foundCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // console.log(foundCampground);
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  })
})

// POST EDIT (CAMPGROUND) --> submit the edit form of a specific campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  var id = req.params.id;
  geocoder.geocode(req.body.campground.location, function(err, data){
    if(err){
      console.log(err);
    } else {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
      var edited_campground = {
        name: req.body.campground.name,
        image: req.body.campground.image,
        price: req.body.campground.price,
        location: location,
        lat: lat,
        lng: lng,
        description: req.body.campground.description
      }
      console.log("Campground is being updated...");

      Campground.findByIdAndUpdate(id, edited_campground, function(err, updatedCampground){
        if(err){
          console.log(err);
          res.redirect("/campgrounds");
        } else {
          console.log("Succesfully edited campground, rendering show view...");
          req.flash("success", "Successfully edited your campground")
          res.redirect("/campgrounds/" + id);
        }
      })
    }
  })
})

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  var id = req.params.id;
  console.log("DEL /campgrounds/" + id + " --> deleting campground...");
  Campground.findByIdAndRemove(id, function(err){
    if(err){
      console.log("an error occured, could not DELETE campground\nRedirect to /campgrounds");
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      console.log("Succesfully deleted campground, redirecting to /campgrounds...");
      req.flash("error", "Sorry... your campground passed away...")
      res.redirect("/campgrounds");
    }
  })
})

module.exports = router;
