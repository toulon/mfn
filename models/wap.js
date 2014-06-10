var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Wap = new Schema({
  serial: { type: String, required: true },
  mac: { type: String },
  model: { type: String },
  label: { type: String },
  location: { type: String },
  note: { type: String }
});

module.exports = mongoose.model('Wap', Wap);
