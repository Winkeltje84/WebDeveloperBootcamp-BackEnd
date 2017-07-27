var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app")

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
  secret: "Bozenhoven28",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
  console.log("GET '/' reached (ROOT)")
  res.render("home");
})

app.get("/secret", isLoggedIn, function(req, res){
  console.log("GET '/secret' reached");
  res.render("secret");
})

// Auth Routes
app.get("/register", function(req, res){
  console.log("GET '/register' reached");
  res.render("register");
})

app.post("/register", function(req, res){
  console.log("POST '/register' reached");
  username = req.body.username;
  password = req.body.password;
  console.log("form submitted with following username & password:")
  console.log(req.body)
  User.register(new User({username: username}), password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function(){
      console.log("Authentication successful, redirecting to SECRET!")
      res.redirect("/secret");
    })
  })
})

app.get("/login", function(req, res){
  console.log("GET '/login' reached. Rendering login form...");
  res.render("login");
})

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res){
})

app.get("/logout", function(req, res){
  console.log("GET /logout reached. Let's log you out!")
  req.logout();
  console.log("user is logged out!")
  res.redirect('/');
})

function isLoggedIn(req, res, next){
  console.log("user tries to reach '/secret'...")
  console.log("checking if authenticated...")
  if(req.isAuthenticated()){
    console.log("authentication successfull!")
    return next();
  }
  console.log("authentication failed, redirecting to '/login'...")
  res.redirect("/login");
}

app.listen("1111", function(){
  console.log("server is running on //localhost:1111");
})
