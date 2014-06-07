var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Oldswitch = new Schema({
  SwitchPort: { type: String, required: true },
  Location: { type: String },
  Patch: { type: String },
  IPAddress: { type: String },
  Vlan: { type: String },
  Port: { type: String },
  Notes: { type: String }
});

module.exports = mongoose.model('Oldswitch', Oldswitch);
