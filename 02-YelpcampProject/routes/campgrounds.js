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
router.get("/:id", isLoggedIn, function(req, res){
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log("Error, no such Campground found");
    } else {
      console.log("User visits a Campground show page:");
      console.log(foundCampground);
      res.render("campgrounds/show", { campground: foundCampground});
    }
  })
})

// GET EDIT (CAMPGROUND) --> show edit page of particular campground
router.get("/:id/edit", isLoggedIn, function(req, res){
  id = req.params.id;
  console.log("GET /campgrounds/" + id + "/edit visited --> rendering edit page...")
  Campground.findById(id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  })})

// POST EDIT (CAMPGROUND) --> submit the edit form of a specific campground
router.put("/:id", isLoggedIn, function(req, res){
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

router.delete("/:id", function(req, res){
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

// app.delete("/blogs/:id", function(req, res){
//   var id = req.params.id;
//   console.log("DEL /blogs/" + id + " --> deleting blogpost...");
//   Blog.findByIdAndRemove(id, function(err){
//     if(err){
//       console.log("An error occured, could not DELETE blog post");
//       console.log(err);
//     } else {
//       console.log("Succesfully deleted blog post, redirecting to blogposts...");
//       res.redirect("/blogs");
//     }
//   })
// })

//  MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;