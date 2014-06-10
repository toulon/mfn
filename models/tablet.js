var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Tablet = new Schema({
  name: { type: String, required: true },
  curdate: { type: Date },
  location: { type: String },
  status: { type: String }
});

module.exports = mongoose.model('Tablet', Tablet);
