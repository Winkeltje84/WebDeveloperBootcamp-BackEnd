var express = require("express"),
    passport = require("passport"),
    User = require("../models/user");

var router = express.Router();

// ROOT PATH
router.get("/", function(req, res){
  console.log("GET ROOT visted")
  res.render("home");
})

// REGISTER ROUTE
router.get("/register", function(req, res){
  console.log("GET '/register' visited");
  res.render('register')
});

// REGISTER POST ROUTE -> create new user
router.post("/register", function(req, res){
  console.log("post '/register' executed");
  var newUser = new User({username: req.body.username});
  console.log("authenticating user...");
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function(){
      console.log("Authentication successful, redirecting to '/campgrounds'");
      res.redirect("/campgrounds");
    });
  });
})

// GET LOGIN ROUTE -> showing login form
router.get("/login", function(req, res){
  console.log("GET '/login' requested");
  console.log("rendering login page...");
  res.render('login');
})

// POST LOGIN ROUTE -> logging user in
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
})

// LOGOUT ROUTE -> logs out user
router.get("/logout", function(req, res){
  console.log("GET '/logout' requested");
  req.logout();
  console.log("logout successful, redirecting to home...");
  res.redirect("/");
})

// WRONG ROUTE --> redirect to ROOT
router.get("*", function(req, res){
  console.log("GET 'none existend' url visited, redirecting to ROOT...");
  res.redirect("/");
})

module.exports = router;
