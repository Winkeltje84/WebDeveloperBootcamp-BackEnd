var express     = require('express');
var request     = require('request');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var app = express();

// App config
app.use(express.static("public")) //using public folder for custom style sheet
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");

// Mongoose Model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now} //sets created to the moment this object is created
});

var Blog = mongoose.model("Blog", blogSchema);

// var firstBlog = Blog.create(
//   {
//     title: "My First Express Blog Post",
//     image: "data:image/jpeg;base64,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",
//     body: "This first blogpost was made on 17-07-17, sweet date!"
//   }, function(err, blogPost){
//     if(err){
//       console.log("there was an error!");
//       console.log(err);
//     } else {
//       console.log("Succesfully created a Blog Post:");
//       console.log(blogPost);
//     }
//   }
// )

// RESTfull routes
app.get("/", function(req, res){
  console.log("GET '/' --> redirect to '/blogs'");
  res.redirect("/blogs");
})

app.get("/blogs/new", function(req, res){
  console.log("GET '/blogs/new' --> show new blog form");
  res.render("new");
})

app.post("/blogs", function(req, res){
  console.log("POST '/blogs' --> create new blog post & redirect to blogs index")
  var title = req.body.blog.title;
  var image = req.body.blog.image;
  var body = req.body.blog.body;
  var newBlogPost = { title: title, image: image, body: body}
  Blog.create(newBlogPost, function(err, blogPost){
        if(err){
          console.log("there was an error!");
          console.log(err);
          res.render("new");
        } else {
          console.log("Succesfully created a Blog Post:");
          console.log(blogPost);
          res.redirect("/blogs");
        }
      }
    )
  }
)

app.get("/blogs/:id", function(req, res){
  var id = req.params.id;
  console.log("GET /blogs/" + id + " --> show blog post")
  Blog.findById(id, function(err, foundBlogPost){
    if(err){
      console.log(err);
      console.log("There was an error finding blog post with id " + id);
      res.redirect("/blogs")
    } else {
      console.log("Succesfully found blog post, rendering show view...")
      res.render("show", {blogPost: foundBlogPost});
    }
  })

})

app.get("/blogs", function(req, res){
  console.log("GET '/blogs --> show blog items'")
  Blog.find({}, function(err, found_blog_posts){
    if(err){
      console.log("Couldn't find blogposts. Error:");
      console.log(err);
    } else {
      // console.log(found_blog_posts);
      res.render("index", {blogPosts: found_blog_posts});

    }
  })
})

app.get("*", function(req, res){
  console.log("GET 'none existend' url visited");
  res.send("Sorry, you ended at a nonexistend url...");
})

app.listen("1111", function(){
  console.log("Server running on http://localhost:1111");
})
