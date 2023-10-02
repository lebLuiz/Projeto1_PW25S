const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  role: String, // ADMIN | TEC | DEFAULT
});

module.exports = User;
