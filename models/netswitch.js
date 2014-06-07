var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Netswitch = new Schema({
  ip: { type: String },
  serial: { type: String },
  model: { type: String },
  location: { type: String },
  name: { type: String },
  prodnbr: { type: String },
  mac: { type: String }
});

module.exports = mongoose.model('Netswitch', Netswitch);
