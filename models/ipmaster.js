var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Ipmaster = new Schema({
  ip: { type: String, required: true },
  hostname: { type: String },
  location: { type: String },
  purpose: { type: String },
  notes: { type: String },
  username: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('Ipmaster', Ipmaster);
