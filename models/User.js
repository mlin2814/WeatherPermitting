// User model

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the headlineSchema with our schema class
var userSchema = new Schema({
  // user first name, a string, must be entered
  userName: {
    type: String,
    required: true,
    unique: false
  },
  // phone number, a number, must be entered
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  // zip code, a number, must be entered
  zipCode: {
    type: String,
    required: true
  },
  
  // preferences
  coldMin: {
    type: Number,
    required: true,
  },
  coldMax: {
    type: Number,
    required: true,
  },
  coolMin: {
    type: Number,
    required: true,
  },
  coolMax: {
    type: Number,
    required: true,
  },
  warmMin: {
    type: Number,
    required: true,
  },
  warmMax: {
    type: Number,
    required: true,
  },
  hotMin: {
    type: Number,
    required: true,
  },
  hotMax: {
    type: Number,
    required: true,
  }
});

// Create the User model using the userSchema
var User = mongoose.model("User", userSchema);

// Export the Headline model
module.exports = User;