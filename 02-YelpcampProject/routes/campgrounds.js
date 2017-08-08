var express = require('express');
var Campground = require('../models/campground');

var router = express.Router();

// GET CAMPGROUNDS INDEX PATH
router.get("/", function(req, res){
  console.log("GET /campgrounds visited")
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds});
    }
  })
})

// POST CAMPGROUND --> creating new campground
router.post("/", isLoggedIn, function(req, res){
  console.log("POST /campgrounds visited");
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var user = {
      id: req.user._id,
      username: req.user.username
  }
  var newCampground = {
    name: name,
    image: image,
    description: description,
    user: user
  }

  Campground.create(newCampground, function(err, newCampground){
    if(err){
      console.log("Could't creat campground:");
      console.log(err);
    } else {
      console.log("Newley created campground:");
      console.log(newCampground);
      res.redirect("/campgrounds");
    }
  });
});

// GET NEW (CAMPGROUND) --> rendering form for new campground
router.get("/new", isLoggedIn, function(req, res){
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
      res.render("campgrounds/show", { campground: foundCampground, userID: req.user._id});
    }
  })
})

// GET EDIT (CAMPGROUND) --> show edit page of particular campground
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
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
router.put("/:id", checkCampgroundOwnership, function(req, res){
  var id = req.params.id;
  var campground = req.body.campground;
  console.log("Campground is being updated...");

  Campground.findByIdAndUpdate(id, campground, function(err, updatedCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      console.log("Succesfully edited campground, rendering show view...");
      res.redirect("/campgrounds/" + id);
    }
  })
})

router.delete("/:id", checkCampgroundOwnership, function(req, res){
  var id = req.params.id;
  console.log("DEL /campgrounds/" + id + " --> deleting campground...");
  Campground.findByIdAndRemove(id, function(err){
    if(err){
      console.log("an error occured, could not DELETE campground\nRedirect to /campgrounds");
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      console.log("Succesfully deleted campground, redirecting to /campgrounds...");
      res.redirect("/campgrounds");
    }
  })
})

//  MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
  // check if user is logged in
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      // console.log(foundCampground.user.id);
      // console.log(req.user._id);
      if(err){
        console.log("checkCampgroundOwnership: there was an error with .findById --> redirecting 'back' to previous page...")
        return res.redirect("back");
      } else {
        // campground id found: check if Campground author id is same as current user id
        if(foundCampground.user.id.equals(req.user._id)){
          console.log("checkCampgroundOwnership: user authorization succesful --> Middleware: 'return next()'")
          next();
        } else {
          console.log("checkCampgroundOwnership: user not authorized --> redirecting 'back' to previous page");
          res.redirect("back");
        }
      }
    })
  } else {
    // if user is not logged in
    console.log("checkCampgroundOwnership: user not logged in --> Redirect to login page...")
    res.redirect("/login");
  }
}

module.exports = router;
