var express = require('express');

var mongoose = require("mongoose");

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

