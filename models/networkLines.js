var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Networklines = new Schema({
  itTicket: { type: String, required: true },
  nbrLines: { type: String },
  location: { type: String },
  requester: { type: String },
  description: { type: String },
  notes: { type: String },
  completedDate: { type: Date }
});

module.exports = mongoose.model('Networklines', Networklines);
