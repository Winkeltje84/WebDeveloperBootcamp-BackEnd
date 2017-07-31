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


// var id = req.params.id;
// req.body.blogPost.body = req.sanitize(req.body.blogPost.body);
// var blogPost = req.body.blogPost;
// // console.log(blogPost)
// console.log("PUT /blogs/" + id + " --> blog post edit is being executed...")
//
// // findByIdAndUpdate takes 3 arguments: id, newData & callback
// Blog.findByIdAndUpdate(id, blogPost, function(err, updatedBlogPost){
//   if(err){
//     console.log(err);
//     console.log("There was an error finding & updating blog post with id " + id);
//     res.redirect("/blogs");
//   } else {
//     console.log("Succesfully edited blog post, rendering show view...");
//     res.redirect("/blogs/" + id);
//   }
// })

//  MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
