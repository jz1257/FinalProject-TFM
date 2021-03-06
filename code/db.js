//mongoose setup
const mongoose = require('mongoose'); 
const urlSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//User schema
const User2 = new Schema({
  username: String,
  password: String
});

User2.plugin(passportLocalMongoose);

//Comment schema
const Comment = new Schema({
  text: String,
  user: String,
  wishlist: String
});

//Item schema
const Item1 = new Schema({
  user: String,
  name: String,
  image: String,
  size: String,
  condition: String,
  description: String,
  comments: [Comment]
});

Item1.plugin(urlSlugs('name'));

mongoose.model('User2', User2);
mongoose.model('Item1', Item1);
mongoose.model('Comment', Comment);



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

