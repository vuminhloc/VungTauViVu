var express = require("express");
var HotelsModel = require("../model/hotels.model");
var ToursModel = require("../model/tour.model");
var bodyParser = require('body-parser')
const render  = require("ejs");
var multer  = require('multer');
const { use } = require("passport");

var Admin_router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).fields([{ name: 'Banner', maxCount: 1 },{ name: 'Img', maxCount: 8 }]) 


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
    res.render('./admin/Hotel/createhotel')
})
Admin_router.post("/hotel/createhotel",function(req,res){
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log("A Multer error occurred when uploading."); 
        } else if (err) {
          console.log("An unknown error occurred when uploading." + err);
        }else{
            var day = new Date().getDate();
            var month = new Date().getMonth()+1
            var year = new Date().getFullYear()
            var h = new Date().getHours();
            var m = new Date().getSeconds();
            var mm = new Date().getMinutes();
            var dd_mm_yyyy = `${day}/${month}/${year}      ${h}:${mm}:${m}`
            var post = {
                MetaTitle:req.body.MetaTitle,
                MetaDescription: req.body.Metadescription,
                MetaKeywords: req.body.Metakeywords,
                Banner:req.files['Banner'],
                Name: req.body.Name,
                Img:req.files['Img'],
                Description: req.body.Description,
                Details:{
                    Price:req.body.Price,
                    Hotel:parseInt(req.body.class),
                    Rooms:parseInt(req.body.Rooms),
                    Region:req.body.Region  
                },
                date: dd_mm_yyyy,
                Location: req.body.Location,
                Contact:{
                    Email:req.body.Email,
                    Website:req.body.Website,
                    Phone:parseInt(req.body.Phone),
                    Address:req.body.Address
                },
                Type:req.body.Type,
                Author:req.user.Name,
                Authorid:req.user._id
            }   
            var data = new HotelsModel(post);
            data.save(function(err){
                if(err){
                    res.json({"errMsg":err})
                }
                else{
                    res.redirect('/admin/hotel')
                }
            })
        }
    })    
})
Admin_router.get("/hotel/update/:id",function(req,res){
    var user = req.user._id;
    HotelsModel.findById({_id : req.params.id})
    .then((result)=>{
        if(user == result.Authorid){
            res.render('./admin/Hotel/updatehotel',{hotels:result})
        }
        else{
            res.json("Xin lỗi bạn không có quyền chỉnh sửa bài viết của người khác,vui lòng back lại trang")
        }
    })
})
Admin_router.post("/hotel/update/:id",function(req,res){
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log("A Multer error occurred when uploading."); 
        } else if (err) {
          console.log("An unknown error occurred when uploading." + err);
        }else{
            var id_post = req.params.id;
            var day = new Date().getDate();
            var month = new Date().getMonth()+1
            var year = new Date().getFullYear()
            var h = new Date().getHours();
            var m = new Date().getSeconds();
            var mm = new Date().getMinutes();
            var dd_mm_yyyy = `${day}/${month}/${year}      ${h}:${mm}:${m}`
            HotelsModel.findById(id_post,function(err,data){
                if(err){
                    console.error("Not id-tour in database")
                }
                data.MetaTitle=req.body.MetaTitle,
                data.MetaDescription= req.body.Metadescription,
                data.MetaKeywords= req.body.Metakeywords,
                data.Banner=req.files['Banner'],
                data.Name= req.body.Name,
                data.Img=req.files['Img'],
                data.Description= req.body.Description,
                data.Details={
                    Price:req.body.Price,
                    Hotel:parseInt(req.body.class),
                    Rooms:parseInt(req.body.Rooms),
                    Region:req.body.Region  
                }
                data.date= dd_mm_yyyy,
                data.Location= req.body.Location,
                data.Contact={
                    Email:req.body.Email,
                    Website:req.body.Website,
                    Phone:parseInt(req.body.Phone),
                    Address:req.body.Address
                }
                data.Type=req.body.Type,
                data.Author=req.user.Name,
                data.Authorid=req.user._id
                data.save(function(err){
                    if(err){
                        res.json({"errMsg":err})
                    }
                    else{
                        res.redirect('/admin/hotel')
                    }
                })
            })
        }
    })
});

Admin_router.post("/hotel/",function(req,res){
    var id = req.body.id;
    var user = req.user._id
    HotelsModel.findById(id,function(err,data){
        if(user == data.Authorid){
            HotelsModel.findByIdAndRemove(id).exec();
            res.redirect('/admin/hotel');
        }
        else{
            res.json("Xin lỗi bạn không có quyền xóa bài viết của người khác,vui lòng back lại trang")
        }
    })
})
;Admin_router.post("/tour",function(req,res){
    var id = req.body.id;
    ToursModel.findByIdAndRemove(id).exec();
    res.redirect('/admin/tour');
});

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