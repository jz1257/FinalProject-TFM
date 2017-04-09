
/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Users
const User = new mongoose.Schema({
  // username, password done through Passport.js
  listings:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clip' }]
});

/*
Name
Image of shoe
Shoe size
Condition (out of 10)
*/
/*
const Item = new mongoose.Schema({
	name: String,
	image: String,
  size: Number,
  condition: String,
  //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  //comments: [Comment]
});

// a Comment
const Comment = new Schema({
  text: String,
  user: String
});

mongoose.model('Item', Item);
mongoose.model('Comment', Comment);


/*
// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/jz1257';
}

mongoose.connect('mongodb://localhost/final-project'); //dbconf


*/

const mongoose = require('mongoose');
   
const urlSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;

const Comment = new Schema({
  text: String,
  user: String
});

const Item = new mongoose.Schema({
  name: String,
  //image: String,
  //size: Number,
  //condition: String,
  //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  //comments: [Comment]
});

//Link.plugin(urlSlugs('title'));

mongoose.model('Comment', Comment);
mongoose.model('Item', Item);


// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/final-project';
}


mongoose.connect(dbconf); //dbconf

