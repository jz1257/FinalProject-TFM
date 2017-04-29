//final project

//express setup
const express = require('express');
const app = express();


//body parser setup
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//static files setup
const path = require('path');
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//session setup
const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang',
	resave: false,
	saveUninitialized: true
};
app.use(session(sessionOptions));

//bcrypt setup
const bcrypt = require('bcrypt');

//bring in database 
require('./db');

//mongoose setup
const mongoose = require('mongoose'),
Item1 = mongoose.model('Item1');
User2 = mongoose.model('User2');
Comment = mongoose.model('Comment');

//passport setup
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrat(User2.authenticate()));
passport.serializeUser(User2.serializeUser());
passport.deserializeUser(User2.deserializeUser());


//displays index page
app.get('/', function (req, res) {
	res.render('index'); 
});

app.get('/register', function(req, res) {
    res.render('register', {error : req.flash('error')});
});

app.post('/register', function(req, res, next) {
    User2.register(new User2({ username : req.body.username}), req.body.password, function(err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        else {
	        passport.authenticate('local')(req, res, function () {
	            res.redirect('/home');
	        });
	    }
    });
});

app.get('/login', function(req, res) {
	res.render('login', {user : req.user, error : req.flash('error') });
});

app.post('/login', passport.authenticate('local', {
    successRedirect : '/home',
    failureRedirect : '/login',
    failureFlash : true
}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.get('/home', (req, res) => {
	Item1.find({}, (err, items) => {
		if(err) {
			//console.log(err);
			res.render('error', {});
		}
		else {
			res.render('home', {user : req.user, items: items.reverse()});
		}
	});
});

app.post('/home', (req, res) => {
	const item = new Item1({
		user: req.user.username,
		name: req.body.name,
		image: req.body.imageURL,
		size: req.body.size,
		condition: req.body.condition,
		description: req.body.description
	});
	item.save((err) => {
		if(err){
			console.log(err);
			res.render('error', {});
		}
		else {
			res.redirect('/home');
		}
	});
});

app.get('/username/:userName', (req, res)=> {
	//res.render('user', {user: req.user});
	User2.findOne({username:req.params.userName}, function(err, user, count) {
        if (!user) {
            res.render('error', {message: "No user"});
        }
        else {
            Item1.find({user:user.username}, function(err, items, count) {
                res.render('user', {user:user, items:items});
            });
        }
    });
});


app.get('/comments/:shoe', (req, res) => {
	const id = req.params.slug;
	let lastComment;
	if(req.session) {
		lastComment = req.session.lastComment;
	}
	Item1.find({slug:id}, (err, item) => {
		if(err || !item.length) {
			res.render('error', {});
		}
		else {
			res.render('comments', { lastComment: lastComment});
		}
	});
	
});

app.post('/comments/:slug', (req, res) => {
	const comment = new Comment({
		text: req.body.text,
		user: req.body.user
	});
	req.session.lastComment = comment.text;
	Item1.findOneAndUpdate(
		{slug: req.params.slug},
		{$push: {comments:comment}}, (err, item) => {
			if(err) {
				res.render('error', {});
			}
			else {
				res.redirect('/comments/' + req.params.slug);
			}
		});
});

app.listen(process.env.PORT || 3000);
console.log('started server on port 3000');