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
  res.render('register', { page: 'register'});
});

// REGISTER POST ROUTE -> create new user
router.post("/register", function(req, res){
  console.log("post '/register' executed");
  var newUser = new User({username: req.body.username});
  if(req.body.secret_admin_code === "SuperSecretPassword"){
    newUser.isAdmin = true;
  }
  console.log("authenticating user...");
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      return res.redirect('/register');
    }
    passport.authenticate("local")(req, res, function(){
      console.log("Authentication successful, redirecting to '/campgrounds'");
      req.flash("info", "Welcome to Yelpcamp " + user.username + "!");
      res.redirect("/campgrounds");
    });
  });
})

// GET LOGIN ROUTE -> showing login form
router.get("/login", function(req, res){
  console.log("GET '/login' requested");
  console.log("rendering login page...");
  res.render('login', { page: 'login'});
})

// POST LOGIN ROUTE -> logging user in
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    successFlash: "Succesfully logged in. Welcome back!",
    failureRedirect: "/login",
    failureFlash: true,
  }), function(req, res){
})

// LOGOUT ROUTE -> logs out user
router.get("/logout", function(req, res){
  console.log("GET '/logout' requested");
  req.logout();
  console.log("logout successful, redirecting to home...");
  req.flash("info", "You are logged out")
  res.redirect("/");
})

// WRONG ROUTE --> redirect to ROOT
router.get("*", function(req, res){
  console.log("GET 'none existend' url visited, redirecting to ROOT...");
  req.flash("error", "Oops! You tried to visit an none-existend page!")
  res.redirect("/");
})

module.exports = router;
