const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//configure the app
app.set('view engine', 'ejs');
app.use(express.static("public"));  //use to serve custom stylesheets
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
// INDEX - list all blog





app.listen(3000, () => {
    console.log("server running at localhost:3000");
});