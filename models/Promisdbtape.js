var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Promisdbtape = new Schema({
  backupDay: { type: Number },
  casseteSlot: { type: String },
  rotation: { type: Date },
  label: { type: String }
});

module.exports = mongoose.model('Promisdbtape', Promisdbtape);
