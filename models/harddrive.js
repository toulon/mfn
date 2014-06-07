var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Harddrive = new Schema({
  Server: { type: String },
  ODModel: { type: String },
  ODSerial: { type: String },
  ODPartNbr: { type: String },
  NDModel: { type: String },
  NDSerial: { type: String },
  NDPartNbr: { type: String },
  trnDate: { type: Date },
  DLocation: { type: String },
  Note: { type: String }
});

module.exports = mongoose.model('Harddrive', Harddrive);
