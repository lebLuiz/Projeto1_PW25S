const { User } = require('../models');

class UserRepository {
  async findById(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async findAllTecs() {
    const tecUsers = await User.findAll({
      where: {
        role: 'TEC',
      },
      attributes: ['id', 'name'],
    });
    return tecUsers;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async create(_user) {
    const userCreated = await User.create({
      name: _user.name,
      email: _user.email,
      password: _user.password,
      role: _user.role,
      id_user_relation: _user.id_user_relation || null,
    });

    return userCreated;
  }
}

module.exports = new UserRepository();
