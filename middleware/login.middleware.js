module.exports.checklogin = function(req,res,next){
    if(req.isAuthenticated())
    {
        next();
    }
    else{
        res.redirect("/login-admin");
    }
}