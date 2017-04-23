// Import Node Modules
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var mongoose = require("mongoose");
var schedule = require('node-schedule');
var nodeFetch = require('node-fetch');
var axios = require('axios');

var test = null;


// Twilio Account
var accountSid = ''; // Your Account SID from www.twilio.com/console
var authToken = '';   // Your Auth Token from www.twilio.com/console



// Set up Express with Body Parser
var app = express();
// var router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));



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



// Routing for app
// ---------------------------------------------------------------------------------------------------------------

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

var zipCode;

// Insert new User into MongoDB
app.post('/add', function(req, res){
  console.log(req.body);

  // Get values from body
  var userName = req.body.userName;
  var phoneNumber = req.body.phoneNumber;
  var zipCode = req.body.zipCode;
  var coldMin = parseInt(req.body.coldMin);
  var coldMax = parseInt(req.body.coldMax);
  var coolMin = parseInt(req.body.coolMin);
  var coolMax = parseInt(req.body.coolMax);
  var warmMin = parseInt(req.body.warmMin);
  var warmMax = parseInt(req.body.warmMax);
  var hotMin = parseInt(req.body.hotMin);
  var hotMax = parseInt(req.body.hotMax);

  var newUser = {
    userName: userName,
    phoneNumber: phoneNumber,
    zipCode: zipCode,
    coldMin: coldMin,
    coldMax: coldMax,
    coolMin: coolMin,
    coolMax: coolMax,
    warmMin: warmMin,
    warmMax: warmMax,
    hotMin: hotMin,
    hotMax: hotMax
  };

  // Using the User model, create a new MongoDB entry
  var entry = new User (newUser);

  // Save the entry to MongoDB
  entry.save(function(err, doc) {
    // log any errors
    if (err) {
    // res.sendStatus(403);
    console.log(err);
    console.log("this is an error");
    } 
    // or log the doc that was saved to the DB
    else {
      console.log();
      res.sendStatus(200);
    }
  });

});


// Launch App
var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});

// ---------------------------------------------------------------------------------------------------------------





// Cron Job to Pull from Mongo every day at 7am and text all users
// ---------------------------------------------------------------------------------------------------------------
var rule = new schedule.RecurrenceRule();
// rule.minute = 36; // <-- for testing (every hour instead)
rule.hour = 6; // <-- actually 7am 
var j = schedule.scheduleJob(rule, function(){

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
        var temp = doc[i];
        var zipUser = temp.zipCode;
        axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zipUser + '&appid=5f58db0e4ad04143b4e102603285e194&cnt=1&units=imperial')
        .then(function(res) {
            console.log(temp);
            return res.data;
        }).then(function(json) {
            console.log(json);
            var userMessage = "";
            var weatherMessage = "";
            if (temp.hotMin <= json.list[0].temp.max && json.list[0].temp.max <= temp.hotMax) {
              userMessage = "Today's high is " + json.list[0].temp.max + ". Recommend light clothing for the heat.";
              //return userMessage;
            } else if (temp.warmMin <= json.list[0].temp.max && json.list[0].temp.max <= temp.warmMax){
              userMessage = "Today's high is " + json.list[0].temp.max + ". Recommend light clothing for the mild heat.";
              //return userMessage;
            } else if (temp.coolMin <= json.list[0].temp.max && json.list[0].temp.max <= temp.coolMax){
              userMessage = "Today's high is " + json.list[0].temp.max + ". Recommend moderate clothing for the cool weather.";
              //return userMessage;
            } else if (temp.coldMin <= json.list[0].temp.max && json.list[0].temp.max <= temp.coldMax){
              userMessage = "Today's high is " + json.list[0].temp.max + ". Recommend heavy clothing for the frigid weather.";
              //return userMessage;
            }
            if (json.list[0].weather[0].main == "Rain") {
              weatherMessage = " Today will rain. Bring umbrella/rainjacket/rain boots.";
              //return weatherMessage;
            } else if (json.list[0].weather[0].main == "Snow") {
              weatherMessage = " Today will snow. Dress warm and wear boots.";
               // return weatherMessage;
            }
            
            var newMess = userMessage + weatherMessage;
            console.log(newMess, " new mess")
            return newMess;
        }).then(function(newMess){
          var message = "Hello, " + temp.userName + "! " 
          var totalMessage = message + newMess;
          console.log(message + newMess);
          console.log(totalMessage);
          return totalMessage;
        }).then(function(totalMessage){
          // Send Text Message To Current User
        var client = new twilio.RestClient(accountSid, authToken);
        client.messages.create({
            body: totalMessage,
            to: "+1" + temp.phoneNumber,  // Text this number
            from: '' // From a valid Twilio number
        }, function(err, message) {
            if (err) {
              console.log(err);
            }
        });
        })

        

        

      }
      
    }

  });

});