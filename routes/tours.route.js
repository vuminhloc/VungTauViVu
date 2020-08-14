var express = require("express");
var ToursModel = require("../model/tour.model");
const render  = require("ejs");

var Tours_router = express.Router();

Tours_router.get("/",function(req,res){
    let page = parseInt(req.query.page) || 1;
    let  perpage = 8;
    let start = page - 1 *perpage;
    let end = page * perpage
    console.log(page)
    ToursModel.find()
    .then(function(doc){
        res.render("tours",{tours:doc.slice(start,end)})
    })
})

Tours_router.get("/search",function(req,res){
    // RegExp là một biểu thức chính quy. 
    //i là một sửa đổi (sửa đổi tìm kiếm không phân biệt chữ hoa chữ thường).
    var rejex = new RegExp(req.query.q,"i");
    ToursModel.find({Name:rejex})
    .then((result)=>{
        res.render("tours",{tours:result})
    })
})

Tours_router.get("/:id",function(req,res){
    ToursModel.findById({_id : req.params.id})
    .then((result)=>{
        res.render("view-tours",{tours:result})
    })
})


module.exports = Tours_router;