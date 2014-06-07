var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Animal = new Schema({
  name: { type: String, required: true },
  mamal: { type: Boolean },
  color: { type: String },
  size: { type: String },
  weigh: { type: String },
  gender: { type: String }
});

module.exports = mongoose.model('Animal', Animal);
