const decodeToken = require('../middlewares/decodeToken');
const TicketRepository = require('../repositories/TicketRepository');

class TicketController {
  async index(request, response) {
    try {
      const tickets = await TicketRepository.findAll();

      response.status(200)
        .json({
          msg: 'Tickets buscadas com sucesso!',
          data: tickets,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async list(request, response) {
    try {
      const { id } = await decodeToken(request);
      const tickets = await TicketRepository.findAllByIdUser(id);

      response.status(200)
        .json({
          msg: 'Tickets buscadas com sucesso!',
          data: tickets,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async listTecs(request, response) {
    try {
      const { id } = await decodeToken(request);
      const tickets = await TicketRepository.findAllByIdUserTec(id);

      response.status(200)
        .json({
          msg: 'Tickets buscadas com sucesso!',
          data: tickets,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async store(request, response) {
    const {
      title,
      description,
      id_category,
    } = request.body;

    if (!title) {
      return response.status(402)
        .json({ error: 'O titulo do ticket é obrigatório!' });
    }

    if (!description) {
      return response.status(402)
        .json({ error: 'A descrição do ticket é obrigatória!' });
    }

    if (!id_category) {
      return response.status(402)
        .json({ error: 'A categoria do ticket é obrigatória!' });
    }

    const { id, role } = await decodeToken(request);
    if (role !== 'DEFAULT') {
      return response.status(403)
        .json({ error: 'Você não está permitido a registrar tickets!' });
    }

    try {
      await TicketRepository.create({
        title,
        description,
        status: 'ABERTO',
        id_category,
        id_user: id,
      });

      response.status(201)
        .json({ msg: 'Ticket criado com sucesso!' });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async updateUserTec(request, response) {
    const { id, id_user_tec } = request.body;

    if (!id) {
      return response.status(402)
        .json({ error: 'O ID é obrigatório!' });
    }

    try {
      await TicketRepository.updateUserTec({ id, id_user_tec });

      response.status(200)
        .json({ msg: 'Ticket alterado com sucesso!' });
    } catch (err) {
      console.log(err);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async updateStatus(request, response) {
    const { id, status, technical_comment } = request.body;

    if (!id) {
      return response.status(402)
        .json({ error: 'O ID é obrigatório!' });
    }

    if (!status) {
      return response.status(402)
        .json({ error: 'O status é obrigatório!' });
    }

    try {
      await TicketRepository.updateStatus({ id, status, technical_comment });

      response.status(200)
        .json({ msg: 'Ticket alterado com sucesso!' });
    } catch (err) {
      console.log(err);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }
}

// Singleton
module.exports = new TicketController();
