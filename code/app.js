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
User = mongoose.model('User');
Comment = mongoose.model('Comment');

//displays index page
app.get('/', function (req, res) {
	res.render('index'); 
});

app.get('/register', function (req, res) {
	res.render('register');
});

app.post('/register', (req, res) => {
	const pw = req.body.password;
	if (pw.length < 8) {
		res.render('error', {message: 'pw length issue'});
	}
	else {
		const un = req.body.username;
		User.findOne({username:un}, (err, result) => {
			if (err) {
				console.log(err);
				res.send('an error occurred, please see the server logs for more information1');	
			}
			else if (result) {
				res.render('error', {message: 'user already exists'});
			}
			else {
				bcrypt.hash(pw, 10, (err, hash) => {
					if (err) {
						console.log(err);
						res.send('an error occurred, please see the server logs for more information2');	
					}
					else {
						const user = new User({
							username: un,
							password: hash
						});
						user.save((err) => {
							if (err) {
								console.log(err);
								res.send('an error occurred, please see the server logs for more information3');	
							}
							else {
								req.session.regenerate((err) => {
									if (err) {
										console.log(err);
										res.send('an error occurred, please see the server logs for more information4');	
									}
									else {
										req.session.username = user.username;
										res.redirect('/home');
									}
								});
							}
						});
					}
				});
			}
		});
	}
});

app.get('/login', function(req, res) {
	res.render('login');
});


app.post('/login', function(req, res) {
	User.findOne({username: req.body.username}, (err, user) => {
		if (!err && user) {
			bcrypt.compare(req.body.password, user.password, (err, passwordMatch) => {
				if (passwordMatch) {
					req.session.regenerate((err) => {
						if (!err) {
							req.session.username = user.username;
							res.redirect('/home'); 
						} 
						else {
							console.log('error'); 
							res.send('an error occurred, please see the server logs for more information');
						}
					});
				}
				else {
					res.render('error', {message: "Incorrect Password"});
				}
			});
		}
		else {
			res.render('error', {message: 'user does not exist'});
		}
	});
});

app.get('/home', (req, res) => {
	Item1.find({}, (err, items) => {
		if(err) {
			//console.log(err);
			res.render('error', {});
		}
		else {
			res.render('home', {items: items});
		}
	});
});

app.post('/home', (req, res) => {
	const item = new Item1({
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

app.get('/user', (req, res)=> {
	res.render('user', {user: req.session.username});
});


app.listen(process.env.PORT || 3000);
console.log('started server on port 3000');