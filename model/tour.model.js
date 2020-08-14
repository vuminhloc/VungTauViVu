const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/MyWebsite");

const TourSchema = new mongoose.Schema({
    ImgBanner: String,
    Name: String,
    Description: String,
    Details:{
        Price:Number,
        Hotel:Number,
        Rooms:Number,
        Region:String
    },
    Img:Array,
    date:String,
    Location: String,
    Contact:{
        Email:String,
        Website:String,
        Phone:Number,
        Address:String
    }
})

const Tour = mongoose.model('Tours',TourSchema,"Tours");

module.exports = Tour