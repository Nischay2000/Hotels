var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	seedDB = require('./seeds');

var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index'),
	blogRoutes = require('./routes/blogs');

//seedDB(); //seed the database
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

//passport configuration
app.use(
	require('express-session')({
		secret: 'Once again Rusty wins cutest dog!',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//SCHEMA SETUP

/*Campground.create(
{
	name:"Salmon Creek",
	image:"https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_md.jpg",
	description:"This is  a huge granite hill,no bathrooms,no water,Beutiful granite!"
},function(err,campground){
	if(err){
		console.log("something went wrong");
	}else{
		console.log("NEWLY CREATED CAMPGROUND: ");
		console.log(campground);
	}
});
*/
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(blogRoutes);

app.listen(3000, function() {
	console.log('WELCOME');
});
