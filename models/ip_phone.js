var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Ip_phone = new Schema({
  mac: { type: String, required: true },
  model: { type: String },
  part_nbr: { type: String },
  extention: { type: String },
  location: { type: String },
  label: { type: String },
  deployed: { type: Boolean },
  note: { type: String }
});

module.exports = mongoose.model('Ip_phone', Ip_phone);
