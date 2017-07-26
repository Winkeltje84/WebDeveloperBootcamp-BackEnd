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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
  res.render("home");
})

app.get("/secret", function(req, res){
  res.render("secret");
})

// Auth Routes
app.get("/register", function(req, res){
  res.render("register");
})

app.post("/register", function(req, res){
  username = req.body.username;
  password = req.body.password;
  res.send("register POST route. Username: " + username + " & password: " + password);
})

app.listen("1111", function(){
  console.log("server is running on //localhost:1111");
})
