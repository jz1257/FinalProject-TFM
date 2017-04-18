//mongoose setup
const mongoose = require('mongoose'); 
const urlSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;

//User schema
const User = new Schema({
  username: {type: String, unique: true},
  password: {type: String, unique: true}
});

//Comment schema
const Comment = new Schema({
  text: String,
  user: String
});

//Item schema
const Item1 = new Schema({
  name: String,
  image: String,
  size: String,
  condition: String,
  description: String,
  //comments: [Comment]
});

mongoose.model('User', User);
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

