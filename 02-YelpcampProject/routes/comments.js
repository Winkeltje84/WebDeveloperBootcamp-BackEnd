var express = require("express");
var Campground = require('../models/campground');
var Comment = require('../models/comment');

var router = express.Router({ mergeParams: true});

// COMMENTS NEW
router.get("/new", isLoggedIn, function(req, res){
  var id = req.params.id;
  Campground.findById(id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground });
    }
  })
})

// COMMENTS POST
router.post("/", isLoggedIn, function(req, res){
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
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
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

// GET EDIT COMMENTS PAGE ROUTE
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
  var id = req.params.id;
  var comment_id = req.params.comment_id;
  console.log("GET /campgrounds/" + id + "/comments/" + comment_id + "/edit requested --> rendering comment edit page")
  Comment.findById(comment_id, function(err, foundComment){
    if(err){
      console.log(err);
      res.redirect("back");
    } else {
      // console.log(foundComment);
      Campground.findById(id, function(err, foundCampground){
        if(err){
          console.log(err);
          res.redirect("back");
        } else {
          // console.log(foundCampground);
          res.render("comments/edit", { comment: foundComment, campground: foundCampground });
        }
      })
    }
  })
})

// COMMENT UPDATE ROUTE - PUT REQUEST (actually edit the comment)
router.put("/:comment_id", checkCommentOwnership, function(req, res){
  var comment_id = req.params.comment_id;
  var comment = req.body.comment;
  var campground_id = req.params.id

  console.log("Comment is being updated...");
  Comment.findByIdAndUpdate(comment_id, comment, function(err, updatedComment){
    if(err){
      console.log(err);
      res.redirect("/campgrounds/" + campground_id);
    } else {
      console.log("Succesfully edited comment, rendering campground show view...");
      res.redirect("/campgrounds/" + campground_id);
    }
  })
})

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
  var campground_id = req.params.id;
  var comment_id = req.params.comment_id;
  console.log("DEL /campgrounds/" + campground_id + "/comments/" + comment_id + " --> deleting comment...");
  Comment.findByIdAndRemove(comment_id, function(err){
    if(err){
      console.log("error in deleting comment... redirect 'back'...");
      res.redirect("back");
    } else {
      console.log("Succesfully deleted comment, redirecting to campground show view...");
      res.redirect("/campgrounds/" + campground_id);
    }
  })
})

// MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

function checkCommentOwnership(req, res, next){
  // check if user is logged in
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      console.log(foundComment.author.id);
      console.log(req.user._id);
      if(err){
        console.log("checkCommentOwnership: there was an error with .findById --> redirecting 'back' to previous page...");
        console.log(err);
        return res.redirect("back");
      } else {
        // comment id found: check if Comment author id is same as current user id
        if(foundComment.author.id.equals(req.user._id)){
          console.log("checkCommentOwnership: user authorization succesful --> Middleware: 'return next()'")
          next();
        } else {
          console.log("checkCommentOwnership: user not authorized --> redirecting 'back' to previous page");
          res.redirect("back");
        }
      }
    })
  } else {
    // if user is not logged in
    console.log("checkCommentOwnership: user not logged in --> Redirect to login page...")
    res.redirect("/login");
  }
}



module.exports = router;
