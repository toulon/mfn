var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Replacment_equipment = new Schema({
  serial: { type: String },
  partnbr: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Replacment_equipment', Replacment_equipment);
