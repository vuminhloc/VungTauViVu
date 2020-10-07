const express = require('express');
var BlogModel = require("../model/blog.model");
const { compile } = require('ejs');
const Blog_router = express.Router();


Blog_router.get('/',function(req,res){
    BlogModel.find()
    .then((result)=>{
        const RS = result.map(function(x){
            let now = new Date()
            let string = '';
            if((now - new Date(x.Time))/1000 > 60*60*24*7*4 ){
              string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60 /24 /7 /4)} Tháng trước `
            }
            else if((now - new Date(x.Time))/1000 > 60*60*24*7 ){
              string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60 /24 /7)} Tuần trước `
            }
            else if((now - new Date(x.Time))/1000 > 60*60*24 ){
              string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60 /24)} ngày trước `
            }
            else if((now - new Date(x.Time))/1000 > 60*60 ){
              string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60)} giờ trước `
            }
            else if((now - new Date(x.Time))/1000 > 60 ){
              string = `${Math.floor((now - new Date(x.Time))/1000 /60)} phút trước `
            }
            else{
              string = 'Vừa Xong'
            }
            return [x,string];
        })
        const sorttime = RS.sort(function(a,b){
          return new Date(b[0].Time) - new Date(a[0].Time)
        })
        const sorttimefooter = result.sort(function(a,b){
          return new Date(b.Time) - new Date(a.Time)
        })
        BlogModel.find({"Type" : "Vui Chơi"})
        .then((vuichoi)=>{
          BlogModel.find({"Type" : "Ăn Uống"})
          .then((anuong)=>{
            BlogModel.find({"Type" : "Xe - Cộ"})
            .then((xeco)=>{
              BlogModel.find({"Type" : "Khách Sạn"})
                .then((khachsan)=>{
                  BlogModel.find({"Type" : "Du Lịch"})
                  .then((dulich)=>{

                    BlogModel.find({"Type" : "Nhà Hàng"})
                    .then((nhahang)=>{
                      BlogModel.find({"Type" : "Địa Điểm"})
                      .then((diadiem)=>{
                        res.render('blog',{blogtime:sorttimefooter,blog:result,sort:sorttime.slice(0,4),dulich:dulich,AnUong:anuong,vuichoi:vuichoi,xeco:xeco,khachsan:khachsan,nhahang:nhahang,diadiem:diadiem})
                      })
                    })
                  })
              })
            })
          })
        })
    })
})

Blog_router.get('/search',function(req,res){
  var regex = new RegExp(req.query.q);
  console.log( req.query.q)
  BlogModel.find({"Type" :req.query.q})
  .then((result)=>{
    const RS = result.map(function(x){
      let now = new Date()
      let string = '';
      if((now - new Date(x.Time))/1000 > 60*60*24*7*4 ){
        string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60 /24 /7 /4)} Tháng trước `
      }
      else if((now - new Date(x.Time))/1000 > 60*60*24*7 ){
        string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60 /24 /7)} Tuần trước `
      }
      else if((now - new Date(x.Time))/1000 > 60*60*24 ){
        string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60 /24)} ngày trước `
      }
      else if((now - new Date(x.Time))/1000 > 60*60 ){
        string = `${Math.floor((now - new Date(x.Time))/1000 /60 /60)} giờ trước `
      }
      else if((now - new Date(x.Time))/1000 > 60 ){
        string = `${Math.floor((now - new Date(x.Time))/1000 /60)} phút trước `
      }
      else{
        string = 'Vừa Xong'
      }
      return [x,string];
    })
    const sorttime = RS.sort(function(a,b){
      return new Date(b[0].Time) - new Date(a[0].Time)
    })
    const sorttimefooter = result.sort(function(a,b){
      return new Date(b.Time) - new Date(a.Time)
    })
    BlogModel.find({"Type" : "Vui Chơi"})
        .then((vuichoi)=>{
          BlogModel.find({"Type" : "Ăn Uống"})
          .then((anuong)=>{
            BlogModel.find({"Type" : "Xe - Cộ"})
            .then((xeco)=>{
              BlogModel.find({"Type" : "Khách Sạn"})
                .then((khachsan)=>{
                  BlogModel.find({"Type" : "Du Lịch"})
                  .then((dulich)=>{

                    BlogModel.find({"Type" : "Nhà Hàng"})
                    .then((nhahang)=>{
                      BlogModel.find({"Type" : "Địa Điểm"})
                      .then((diadiem)=>{
                        res.render('blog',{blogtime:sorttimefooter,blog:result,sort:sorttime.slice(0,4),dulich:dulich,AnUong:anuong,vuichoi:vuichoi,xeco:xeco,khachsan:khachsan,nhahang:nhahang,diadiem:diadiem})
                      })
                    })
                  })
              })
            })
          })
        })
    })
})

Blog_router.get("/:id",function(req,res){
    BlogModel.findById({_id : req.params.id})
    .then((result)=>{
      BlogModel.find()
      .then((doc)=>{
          var sort = doc.sort(function(a,b){
            return new Date(b.Time) - new Date(a.Time)
          })
          res.render("view-blog",{blogs:result,blogtime:sort})
      })
    })
    .catch(errr=>{res.render('404')});
})

module.exports = Blog_router;