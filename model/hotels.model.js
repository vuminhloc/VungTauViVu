const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/MyWebsite"); 

const HotelsSchema = new mongoose.Schema({
    MetaTitle:String,
    MetaDescription: String,
    MetaKeywords: String,
    Banner:Array,
    Name: String,
    Img:Array,
    Description: String,
    Details:{
        Price:{
            MinPrice:Number,
            MaxPrice:Number
        },
        Hotel:Number,
        Rooms:Number,
        Region:String   
    },
    date: String,
    Location: String,
    Contact:{
        Email:String,
        Website: String,
        Phone:Number,
        Address:String
    },
    Type:Array,
    Author:String,
    Authorid:String
})

const Hotel = mongoose.model('Hotels',HotelsSchema,'Hotels');

module.exports = Hotel;