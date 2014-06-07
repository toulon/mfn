var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Cur_ipmaster = new Schema({
  ip_address: { type: String, required: true },
  computer_name: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  mac: { type: String },
  active: { type: String },
  note: { type: String },
  first: { type: String },
  second: { type: String },
  third: { type: String },
  fourth: { type: String }
});

module.exports = mongoose.model('Cur_ipmaster', Cur_ipmaster);
