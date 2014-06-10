var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Networkline = new Schema({
  itTicket: { type: String, required: true },
  fcTicket: { type: String },
  nbrLines: { type: String },
  location: { type: String },
  requester: { type: String },
  description: { type: String },
  notes: { type: String },
  completedDate: { type: Date }
});

module.exports = mongoose.model('Networkline', Networkline);
