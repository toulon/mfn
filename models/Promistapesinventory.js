var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var Promistapesinventory = new Schema({
  Database: { type: Boolean },
  OS: { type: String }
});

module.exports = mongoose.model('Promistapesinventory', Promistapesinventory);
