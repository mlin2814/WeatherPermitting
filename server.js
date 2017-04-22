var express = require('express');
var mongoose = require("mongoose");

// Twilio Api
var accountSid = 'AC53fe3f517e9cbf3ff65cd9ae3f52e7c5'; // Your Account SID from www.twilio.com/console
var authToken = '78bd2e02999424eb331cc883d6ab653d';   // Your Auth Token from www.twilio.com/console
var client = require('twilio')(accountSid, authToken);
var schedule = require('node-schedule');


var app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'http') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});

app.use(express.static('public'));

// If deployed, use the deployed database. Otherwise use the local weather database
var db = process.env.MONGODB_URI || "mongodb://localhost/weatherdb";


// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

app.listen(PORT, function () {
	console.log('Express Server open on Port ' + PORT)
});

// Twilio routes

var rule = new schedule.RecurrenceRule();
rule.minute = 11;

var sendText = schedule.scheduleJob(rule, function(){
client.messages.create({
    to: '17327251503',
    from: '17326075111',
    body: 'this is working',
  }, function (err, message) {
      console.log(message.sid);
  });
});
