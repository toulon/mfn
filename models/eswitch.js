var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Eswitch = new Schema({
  sname: { type: String, required: true },
  slocation: { type: String },
  sip: { type: String },
  nagios: { type: Boolean }
});

module.exports = mongoose.model('Eswitch', Eswitch);
