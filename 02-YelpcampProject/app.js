var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
  console.log("GET ROOT visted")
  res.render("home");
})

app.get("/campgrounds", function(req, res){
  console.log("GET /campgrounds visited")
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds});
    }
  })
})

app.post("/campgrounds", function(req, res){
  console.log("POST /campgrounds visited");
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description}
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

app.get("/campgrounds/new", function(req, res){
  console.log("GET /campgrounds/new visited")
  res.render("campgrounds/new");
})

app.get("/campgrounds/:id", function(req, res){
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

// ===== COMMENT ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res){
  var id = req.params.id;
  Campground.findById(id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground });
    }
  })
})

app.post("/campgrounds/:id/comments", function(req, res){
  var id = req.params.id;
  console.log("POST /campgrounds/" + id + "/comments visited --> creating new comment" );
  Campground.findById(id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      var comment = req.body.comment;
      Comment.create(comment, function(err, comment){
          if(err){
            console.log(err);
          } else {
            campground.comments.push(comment);
            campground.save();
            console.log("Added a comment from seeds... redirecting to show page...");
            res.redirect('/campgrounds/' + id);
          }
        }
      )
    }
  })



});



// ===== WRONG ROUTES

app.get("*", function(req, res){
  console.log("GET 'none existend' url visited")
  res.send("Sorry, you ended at a nonexistend url...")
})

app.listen("1111", function(){
  console.log("server running on http://localhost:1111");
})
