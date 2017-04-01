
# The Flee Market

## Overview

Sneaker collecting has been a thing ever since Michael Jordan released his first shoe with Nike back in 1985. But recently, there seems to be
a surge in popularity in this so called sneaker game. Everyone from children to grown adults are seeking to own the hottest sneakers, vintage or brand new. However, not all of these coveted kicks can be purchased from your local Footlocker or Adidas store. Due to their high demand, the more sought after sneakers tend to sell out almost instantaneously these days and your only chance of obtaining a pair would be to buy it off of a fellow sneakerhead.

The Flee Market (TFM) aims to facilitate these secondary market transactions. TFM would allow users to post up a "Selling" or "Buying" listing for a  pair of sneakers and allows other users to reply to that listing to negotiate a deal, similar to Craigs List but centered around shoes. Users can also "favorite" listings, similar to an "add to cart" feature, to keep a list of the shoes they're thinking of buying.

## Data Model

This application would store 
* Users 
* Listings (separated into picture(s) and description) 
* Comments.


## Schema

```javascript
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
Flaws of the shoe
*/

const Item = new mongoose.Schema({
  name: String,
  image: String,
  size: Number,
  condition: Number,
  flaws: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  comments: [Comment]
});

// a Comment
var Comment = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  text: String
});
```

## Wireframes


![Mock Listing](documentation/TheFleeMarket.png)




## Site map

![Mock Listing](documentation/SiteMap.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new sneaker listing
4. as a user, I can view all of the listings created by other users
5. as a user, I can comment on other listings
6. as a user, I can add other listings to my "favorites" list

## Research Topics



* (5 points) Integrate user authentication
    
* (3 points) Unit testing with JavaScript




## [Link to Initial Main Project File](app.js) 


