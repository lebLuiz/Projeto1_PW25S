const User = require('../models/User');

class UserRepository {
  async findById(id) {
    const user = await User.findById(id, '-password');
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async create(_user) {
    const user = new User({
      name: _user.name,
      email: _user.email,
      password: _user.password,
      role: _user.role,
    });

    const userCreated = await user.save();

    return userCreated;
  }
}

module.exports = new UserRepository();
