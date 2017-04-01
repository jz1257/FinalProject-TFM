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

const Item = new mongoose.Schema({
	name: String,
	image: String,
  size: Number,
  condition: Number
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  comments: [Comment]
});

// a Comment
var Comment = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  text: String
});

