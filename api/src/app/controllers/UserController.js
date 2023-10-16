const decodeToken = require('../middlewares/decodeToken');
const UserRepository = require('../repositories/UserRepository');

class UserController {
  async me(request, response) {
    const decodeUser = await decodeToken(request);

    response.json(decodeUser);
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);
    if (!user) {
      return response.status(404)
        .json({ error: 'Usuário não encontrado!' });
    }

    // eslint-disable-next-line
    const { password, ...restUser } = user.dataValues;

    response.json(restUser);
  }

  async listTecs(request, response) {
    try {
      const tecUsers = await UserRepository.findAllTecs();

      response.status(200)
        .json({
          msg: 'Técnicos buscados com sucesso!',
          data: tecUsers,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
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
