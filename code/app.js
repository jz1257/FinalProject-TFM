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


const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang',
	resave: false,
	saveUninitialized: true
};
app.use(session(sessionOptions));

require('./db');

const mongoose = require('mongoose'),
Item = mongoose.model('Item');

app.get('/', (req, res) => {
  Item.find({}, (err, items) => {
		if(err) {
			console.log(err);
		}
		else {
			res.render('home', {items: items});
		}
	});
});

app.post('/', (req, res) => {
	const item = new Item({
		name: req.body.username
	});
	item.save((err) => {
		if(err){
			console.log(err);
		}
		else {
			res.redirect('/');
		}
	});
});


app.listen(process.env.PORT || 3000);
console.log('started server on port 3000');