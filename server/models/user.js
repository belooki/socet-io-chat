const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  socketId: String,
  dataStart: Date,
  dataEnd: Date,
});

module.exports = mongoose.model('User', userSchema);
