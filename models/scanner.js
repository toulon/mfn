var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Scanner = new Schema({
  IPAddress: { type: String },
  model: { type: String },
  serialNbr: { type: String },
  browserVersion: { type: String },
  converted: { type: Boolean },
  notes: { type: String }
});

module.exports = mongoose.model('Scanner', Scanner);
