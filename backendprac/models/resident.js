const mongoose = require('mongoose');

const residentSchema = mongoose.Schema({
  name: { type: String, required: true},
  content: { type: String, required: true}
});

module.exports = mongoose.model('Resident', residentSchema);
