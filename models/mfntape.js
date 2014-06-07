var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Mfntape = new Schema({
  label: { type: String, required: true },
  action_date: { type: Date },
  action: { type: String },
  location: { type: String }
});

module.exports = mongoose.model('Mfntape', Mfntape);
