var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Serverroom = new Schema({
  ServerName: { type: String },
  Location: { type: String },
  Port: { type: String },
  SwitchPort: { type: String },
  vlan: { type: String },
  IPAddress: { type: String },
  Switch: { type: String },
  SwPort: { type: String },
  OS: { type: String },
  Notes: { type: String }
});

module.exports = mongoose.model('Serverroom', Serverroom);
