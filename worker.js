// Import Node Modules
var twilio = require('twilio');
var mongoose = require("mongoose");


// Twilio Account
var accountSid = ''; // Your Account SID from www.twilio.com/console
var authToken = '';   // Your Auth Token from www.twilio.com/console


// Database Configuration with Mongoose
// ---------------------------------------------------------------------------------------------------------------
// Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production'){
  mongoose.connect('');
}
else{
  mongoose.connect('mongodb://localhost/weatherdb');
}
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import the User model
var User = require('./models/User.js');
// ---------------------------------------------------------------------------------------------------------------





// Insert into MongoDB
// ---------------------------------------------------------------------------------------------------------------
var newUser = {
  userName: "Matthew",
  phoneNumber: "7324210472",
  zipCode: "08840",
  coldMin: 0,
  coldMax: 40,
  coolMin: 41,
  coolMax: 60,
  warmMin: 71,
  warmMax: 80,
  hotMin: 81,
  hotMax: 100
};

// Using the User model, create a new MongoDB entry
var entry = new User (newUser);

// Save the entry to MongoDB
entry.save(function(err, doc) {
  // log any errors
  if (err) {
    console.log(err);
  } 
  // or log the doc that was saved to the DB
  else {
    console.log(doc);
  }
});

// ---------------------------------------------------------------------------------------------------------------











// Pull from Mongo
// ---------------------------------------------------------------------------------------------------------------
// Query MongoDB for all users
User.find().exec(function(err, doc){

  // log any errors
  if (err){
    console.log(err);
  } 
  // no errors, proceed
  else {
    
    // Loop over all users in the DB
    for (var i=0; i < doc.length; i++) {

      // Create Custom Message
      var userMessage = "Hello, " + doc[i].userName + "!";

      // Send Text Message To Current User
      var client = new twilio.RestClient(accountSid, authToken);
      client.messages.create({
          body: userMessage,
          to: "+1" + doc[i].phoneNumber,  // Text this number
          from: '' // From a valid Twilio number
      }, function(err, message) {
          if (err) {
            console.log(err);
          }
      });

    }
    
  }

});




// ---------------------------------------------------------------------------------------------------------------