var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Name:string:require=true = new Schema({
  mamal: { type: Boolean },
  color: { type: String },
  size: { type: String },
  weigh: { type: String }
});

module.exports = mongoose.model('Name:string:require=true', Name:string:require=true);
