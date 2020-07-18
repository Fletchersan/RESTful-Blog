const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//configure the app
app.set('view engine', 'ejs');
app.use(express.static('public'));  //use to serve custom stylesheets
app.use(bodyParser.urlencoded({extended:true}));
//Configure Mongoose
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
//Setup schema and model/ MODEL CONFIG  
const blogSchema = new mongoose.Schema(
    {
        title: String, 
        image: String,
        body: String,
        created: {type: Date, default: Date.now},
    }
);
const Blog = mongoose.model("Blog",blogSchema);
//RESTful Routes
app.get("/", (req, res) => res.redirect('/blogs'));
// INDEX - list all blog | CREATE - create the blog and redirect to INDEX
app.route("/blogs")             //modular routing hopefully can allow linked routes to be together?
    .get((req, res) => {
        Blog.find().then((blogList) => {
            res.render("index", {blogs: blogList});
        });
    })
    .post((req,res) => {
        //create blog
        //redirect to index
        Blog(req.body.blog).save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch( err=> console.log(err));
    });


//NEW
app.route("/blogs/new")
    .get((req, res) => {
        res.render("new");
    });
//SHOW 
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id)
    .then( blog => res.render('show', {blog: blog}))
    .catch(err => res.redirect('/blogs'));
});

app.listen(3000, () => {
    console.log("server running at localhost:3000");
});