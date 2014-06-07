var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Ip_phone = new Schema({
  mac: { type: String, required: true },
  model: { type: String },
  part_nbr: { type: String },
  extention: { type: String },
  note: { type: String }
});

Ip_phone.statics.findByMac = function (mac, callback) {
  return this.find({ mac: mac }, callback);
}

module.exports = mongoose.model('Ip_phone', Ip_phone);
