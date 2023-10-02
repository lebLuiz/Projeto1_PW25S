const UserRepository = require('../repositories/UserRepository');

class UserController {
  async show(request, response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);
    if (!user) {
      return response.status(404)
        .json({ error: 'Usuário não encontrado!' });
    }

    request.json(user);
  }

  async showByEmail(request, response) {
    const { email } = request.params;
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return response.status(404)
        .json({ error: 'Usuário não encontrado' });
    }

    response.json(user);
  }
}

// Singleton
module.exports = new UserController();
