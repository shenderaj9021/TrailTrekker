var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/", function (req, res) {

    res.render("landingPage.ejs");

});



//COMMENTS




//=================
//AUTHENTICATION ROUTES
//=================
//Register Route

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    var newUser=new User({username :req.body.username});
    User.register(newUser,req.body.password, function(err,user){
        if(err)
        {
            req.flash("error",err.message);
            return res.render("register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome "+user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//LOGIN Route
router.get("/login",function(req,res){
    
    res.render("login");
});

router.post("/login", passport.authenticate("local",
        {successRedirect: "/campgrounds",failureRedirect : "/login"})   
        ,function(req,res){});

//LOGOUT rotue
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success"," You Logged out");
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return  next();
    }
    
   
    res.redirect("/login");
}

module.exports=router;