var Campground = require('../models/campground');
var Comment = require('../models/comment');

// All Middleware functions of YelpcampProject
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req, res, next){
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

middlewareObj.checkCampgroundOwnership = function(req, res, next){
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

module.exports = middlewareObj
