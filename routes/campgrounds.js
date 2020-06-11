var express = require("express");
var router  =  express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/campgrounds",function(req,res){
		//Get all campgrounds from Db
		Campground.find({},function(err,allCampgrounds){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});
			}
		});
});

router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	//get data from form and add to array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username:req.user.username
	}
	var newCampground = {name: name,price: price,image: image,description:desc, author:author}

	//Create a new campground and save to DB;
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgroounds page
			console.log(newCampground);
		}
	});
	res.redirect("/campgrounds");
});
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});
router.get("/campgrounds/:id",function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show",{campground: foundCampground});		
		}
	});
});

//Edit campground route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
		Campground.findById(req.params.id,function(err,foundCampground){

				res.render("campgrounds/edit",{campground:foundCampground});
	});
});
//update campground route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});
//Destroy Campground Route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
})

//middleware

module.exports = router;