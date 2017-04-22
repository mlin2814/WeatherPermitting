// Controller for our users

var User = require("../models/User");

module.exports = {
  get: function(data, cb) {
    User.find({
      _id: data._id
    }, cb);
  },
  save: function(data, cb) {
    var newUser = {
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      zipCode: data.zipCode,
      cold: data.cold,
      cool: data.cool,
      warm: data.warm,
      hot: data.hot
    };

    User.create(newUser, function(err, doc) {
      // Log any errors
      if (err) {
        console.log(err);
      }
      // Or just log the doc we saved
      else {
        console.log(doc);
        // Place the log back in this callback function
        // so it can be used with other functions asynchronously
        cb(doc);
      }
    });
  },
  delete: function(data, cb) {
    User.remove({
      _id: data._id
    }, cb);
  }
};