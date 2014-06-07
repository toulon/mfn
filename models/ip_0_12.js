var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Ip_0_12 = new Schema({
  IP: { type: String },
  ifTypeIcon: { type: String },
  ifName: { type: String },
  ifDescr: { type: String },
  ifAlias: { type: String },
  ifAdminIcon: { type: String },
  ifOperIcon: { type: String },
  MAC: { type: String },
  DNS: { type: String },
  VLANs: { type: String },
  VLANforMAC: { type: String },
  ifspeed: { type: String },
  ifpype: { type: String },
  TrunkPort: { type: String }
});

module.exports = mongoose.model('Ip_0_12', Ip_0_12);
