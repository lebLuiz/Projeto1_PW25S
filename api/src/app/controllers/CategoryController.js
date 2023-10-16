const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    try {
      const categories = await CategoryRepository.findAll();

      response.status(200)
        .json({
          msg: 'Categorias buscadas com sucesso!',
          data: categories,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async store(request, response) {
    const {
      name,
    } = request.body;

    if (!name) {
      return response.status(402)
        .json({ error: 'O nome da categoria é obrigatório!' });
    }

    try {
      await CategoryRepository.create({ name });

      response.status(201)
        .json({ msg: 'Categoria criada com sucesso!' });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async update(request, response) {
    const { id, name } = request.body;

    if (!id) {
      return response.status(402)
        .json({ error: 'O ID é obrigatório!' });
    }

    if (!name) {
      return response.status(402)
        .json({ error: 'O nome da categoria é obrigatório!' });
    }

    try {
      await CategoryRepository.update({ id, name });

      response.status(200)
        .json({ msg: 'Categoria alterada com sucesso!' });
    } catch (err) {
      console.log(err);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(402)
        .json({ error: 'O ID é obrigatório!' });
    }

    try {
      await CategoryRepository.delete(id);

      response.status(200)
        .json({ msg: 'Categoria removida com sucesso!' });
    } catch (err) {
      console.log(err);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }
}

// Singleton
module.exports = new CategoryController();
