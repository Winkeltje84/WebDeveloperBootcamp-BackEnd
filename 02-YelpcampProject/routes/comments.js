var express = require("express");
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware/index');

var router = express.Router({ mergeParams: true});

// COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
            req.flash("error", "Something went wrong, couldn't create comment");
          } else {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            console.log("Added a comment from seeds... redirecting to show page...");
            req.flash("success", "Thanks for your comment!")
            res.redirect('/campgrounds/' + id);
          }
        }
      )
    }
  })
});

// GET EDIT COMMENTS PAGE ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
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
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
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
      req.flash("info", "Your comment was succesfully edited")
      res.redirect("/campgrounds/" + campground_id);
    }
  })
})

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  var campground_id = req.params.id;
  var comment_id = req.params.comment_id;
  console.log("DEL /campgrounds/" + campground_id + "/comments/" + comment_id + " --> deleting comment...");
  Comment.findByIdAndRemove(comment_id, function(err){
    if(err){
      console.log("error in deleting comment... redirect 'back'...");
      res.redirect("back");
    } else {
      console.log("Succesfully deleted comment, redirecting to campground show view...");
      req.flash("error", "Your comment was succesfully deleted")
      res.redirect("/campgrounds/" + campground_id);
    }
  })
})

module.exports = router;
