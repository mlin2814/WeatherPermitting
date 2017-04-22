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
    type: Number,
    required: true,
    unique: true,
    max: 10
  },
  // zip code, a number, must be entered
  zipCode: {
    type: Number,
    required: true,
    max: 5
  },
  
  // preferences
  cold: {
    type: Number,
    required: true,
  },
  cool: {
    type: Number,
    required: true,
  },
  warm: {
    type: Number,
    required: true,
  },
  hot: {
    type: Number,
    required: true,
  }
});

// Create the User model using the userSchema
var User = mongoose.model("User", userSchema);

// Export the Headline model
module.exports = User;