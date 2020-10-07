const express = require('express');
var HotelModel = require("../model/hotels.model");

const route = express.Router();


route.get('/',(req,res)=>{
    var gia = req.query.Gia;
    var q = req.query.q;
    var page = parseInt(req.query.page) || 1;
    var perpage = 6;
    var Start = (page - 1)* perpage;//0
    var end = page * perpage;//6
    HotelModel.find()
    .then(function(doc){
        var sumpage = Math.ceil((doc.length/6));
        res.render("hotels",{hotels:doc.slice(Start,end),pagination:sumpage,page:page,sumpage:sumpage,q:q,gia:gia})
    })
    .catch(errr=>{res.render('404')});
})

route.get("/search",function(req,res){
    function xoa_dau(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }
    // RegExp là một biểu thức chính quy. 
    //i là một sửa đổi (sửa đổi tìm kiếm không phân biệt chữ hoa chữ thường).
    var gia = req.query.Gia;
    var q = req.query.q;
    var page = parseInt(req.query.page) || 1;
    var perpage = 6;
    var Start = (page - 1)* perpage;
    var end = page * perpage;
    var removesign= req.query.q;
    var regex = new RegExp(removesign,"gi")
    HotelModel.find({ "Name" : regex }).sort({'Details.Price.MaxPrice':parseInt(gia)})
    .then((result)=>{  
        var sumpage = Math.ceil((result.length/6));
        res.render("hotels",{hotels:result.slice(Start,end),pagination:sumpage,page:page,sumpage:sumpage,q:q,gia:gia})
    })
})

route.get("/:id",function(req,res){
    HotelModel.findById({_id : req.params.id})
    .then((result)=>{
        res.render("view-hotels",{hotels:result})
    })
    .catch(errr=>{res.render('404')});
})


module.exports = route;