var express = require("express"),
    passport = require("passport"),
    User = require("../models/user");

var router = express.Router();

// ROOT PATH

router.get("/", function(req, res){
  console.log("GET ROOT visted")
  res.render("home");
})

// AUTH ROUTES

router.get("/register", function(req, res){
  console.log("GET '/register' visited");
  res.render('register')
});

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

router.get("/login", function(req, res){
  console.log("GET '/login' requested");
  console.log("rendering login page...");
  res.render('login');
})

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
})

router.get("/logout", function(req, res){
  console.log("GET '/logout' requested");
  req.logout();
  console.log("logout successful, redirecting to home...");
  res.redirect("/");
})

// ===== WRONG ROUTES

router.get("*", function(req, res){
  console.log("GET 'none existend' url visited")
  res.send("Sorry, you ended at a nonexistend url...")
})

// ===== MIDDLEWARE

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
