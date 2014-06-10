var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Waptracker = new Schema({
  name: { type: String, required: true },
  tdate: { type: Date },
  location: { type: String },
  issue: { type: String }
});

module.exports = mongoose.model('Waptracker', Waptracker);
