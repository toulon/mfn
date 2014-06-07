var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Promisoffsitestorage = new Schema({
  label: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Promisoffsitestorage', Promisoffsitestorage);
