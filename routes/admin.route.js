var express = require("express");
var HotelsModel = require("../model/hotels.model");
var ToursModel = require("../model/tour.model");
var bodyParser = require('body-parser')
const render  = require("ejs");

var Admin_router = express.Router();
Admin_router.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
Admin_router.use(bodyParser.json())

Admin_router.get("/",function(req,res){
    res.render("./admin/admin")
})

Admin_router.get("/hotel",function(req,res){
    HotelsModel.find()
    .then(function(doc){
        res.render("./admin/Hotel/indexhotels",{
            hotels:doc,
        })
    })
})
Admin_router.get("/hotel/createhotel",function(req,res){
    HotelsModel.find()
    .then(function(doc){
        res.render('./admin/Hotel/createhotel',{
            hotels:doc,
        })
    })
})

Admin_router.get("/tour",function(req,res){
    ToursModel.find()
    .then(function(doc){
        res.render("./admin/tours/indextour",{
            tours:doc,
            stt:doc.length,
        })
    })
})
Admin_router.get("/tour/create",function(req,res){
    res.render("./admin/tours/createtour")
})

Admin_router.get("/tour/update/:id",function(req,res){
    ToursModel.findById({_id : req.params.id})
    .then((result)=>{
        res.render("./admin/tours/updatetour",{tour:result})
    })
})

Admin_router.post("/tour/create",function(req,res){
    var day = new Date().getDate();
    var month = new Date().getMonth()+1
    var year = new Date().getFullYear()
    var h = new Date().getHours();
    var m = new Date().getSeconds();
    var mm = new Date().getMinutes();
    var dd_mm_yyyy = `${day}/${month}/${year}      ${h}:${mm}:${m}`
    var post = {
        Name: req.body.name,
        Description: req.body.Description,
        Details:{
            Price:parseInt(req.body.Price),
            Hotel:parseInt(req.body.Hotel),
            Rooms:parseInt(req.body.Rooms),
            Region:req.body.Region    
        },
        date: dd_mm_yyyy,
        Location: String,
        Contact:{
            Email:req.body.Email,
            Website:req.body.Website,
            Phone:parseInt(req.body.Phone),
            Address:req.body.Address
        }
    }   
    
    var data = new ToursModel(post);
    data.save()

    res.redirect("/admin/tour")
})

Admin_router.post("/tour/update/:id",function(req,res){
    var day = new Date().getDate();
    var month = new Date().getMonth()+1
    var year = new Date().getFullYear()
    var h = new Date().getHours()+1;
    var m = new Date().getSeconds();
    var mm = new Date().getMinutes();
    var dd_mm_yyyy = `${day}/${month}/${year}      ${h}:${mm}:${m}`
    var id_post = req.params.id;
    ToursModel.findById(id_post,function(err,data){
        if(err){
            console.error("Not id-tour in database")
        }
        data.Name = req.body.name
        data.Description= req.body.Description
        data.Details={
            Price:parseInt(req.body.Price),
            Hotel:parseInt(req.body.Hotel),
            Rooms:parseInt(req.body.Rooms),
            Region:req.body.Region    
        }
        data.date= dd_mm_yyyy
        data.Location= String
        data.Contact={
            Email:req.body.Email,
            Website:req.body.Website,
            Phone:parseInt(req.body.Phone),
            Address:req.body.Address
        }
        data.save();
    })
    res.redirect("/admin/tour")
})

Admin_router.post("/tour",function(req,res){
    var id = req.body.id;
    ToursModel.findByIdAndRemove(id).exec();
    res.redirect('/admin/tour');
});

Admin_router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/login-admin")
})


module.exports = Admin_router;