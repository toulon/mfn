var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Promisostape = new Schema({
  backupWeek: { type: Number },
  casseteSlot: { type: String },
  rotation: { type: Date },
  label: { type: String }
});

module.exports = mongoose.model('Promisostape', Promisostape);
