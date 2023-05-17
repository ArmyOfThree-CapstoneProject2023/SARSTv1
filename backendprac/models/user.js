//
const mongoose = require('mongoose');
//imports new functions mongoose uses on the schema
const uniqueValidator = require('mongoose-unique-validator');

//Defined shape of document in registerUserSchema collection
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  accountType: { type: String, required: true }
});

//allows mongoose to check if email is already in database and blocks if it is
userSchema.plugin(uniqueValidator);


//converting schemas into mongoose models
module.exports = mongoose.model('User', userSchema);



