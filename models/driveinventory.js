var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Driveinventory = new Schema({
  Serial: { type: String },
  Model: { type: String },
  Mfg: { type: String },
  PartNbr: { type: String },
  Speed: { type: String },
  Size: { type: String },
  Date: { type: Date },
  Description: { type: String },
  Server: { type: String },
  Location: { type: String },
  Note: { type: String }
});

module.exports = mongoose.model('Driveinventory', Driveinventory);
