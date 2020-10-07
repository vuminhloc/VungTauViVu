const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/MyWebsite"); 

const BlogsSchema = new mongoose.Schema({
    MetaTitle:String,
    MetaDescription: String,
    MetaKeywords: String,
    Banner:String,
    Name: String,
    Description: String,
    Content:String,
    date: String,
    Time:String,
    Type:String,
    Author:String,
    Authorid:String
})

const Blog = mongoose.model('Blogs',BlogsSchema,'Blogs');

module.exports = Blog;