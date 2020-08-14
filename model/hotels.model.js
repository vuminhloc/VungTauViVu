const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/MyWebsite"); 

const HotelsSchema = new mongoose.Schema({
    Banner:String,
    Name:String,
    Description:String,
    Details:{
        Price:Number,
        Location:String,
        HotelSart:Number,
    },
    Img:Array,
    Amenities:{
        PrivateAccess:String,
        Parking:String,
        Room:Number,
        Views:String
    },
    Keyword:String
})

const Hotel = mongoose.model('Hotels',HotelsSchema,'Hotels');

module.exports = Hotel;