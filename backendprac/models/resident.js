const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  rfname: { type: String, required: true},
  rlname: { type: String, required: true},
  rdob: { type: String, required: true},
  rsex: { type: String, required: true},
  rgender: { type: String, required: true},
  rpronouns: { type: String, required: true},
  content: { type: String, required: true},
  task: { type: String, required: true},
  disAction: { type: String, required: true},
});

module.exports = mongoose.model('Resident', residentSchema);
