const { Ticket } = require('../models');
const { Category } = require('../models');

class TicketRepository {
  async findAll() {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    return tickets;
  }

  async findAllByIdUser(id_user) {
    const tickets = await Ticket.findAll({
      where: {
        id_user,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    return tickets;
  }

  async findAllByIdUserTec(id_user_tec) {
    const tickets = await Ticket.findAll({
      where: {
        id_user_tec,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    return tickets;
  }

  async create(_ticket) {
    const ticketCreated = await Ticket.create({
      title: _ticket.title,
      description: _ticket.description,
      status: _ticket.status,
      id_category: _ticket.id_category,
      id_user: _ticket.id_user,
    });

    return ticketCreated;
  }

  async updateUserTec(_ticket) {
    const ticketUpdated = await Ticket.update({
      id_user_tec: _ticket.id_user_tec || null,
    }, {
      where: {
        id: _ticket.id,
      },
    });

    return ticketUpdated;
  }

  async updateStatus(_ticket) {
    const ticketUpdated = await Ticket.update({
      status: _ticket.status || 'ABERTO',
      technical_comment: _ticket.technical_comment,
    }, {
      where: {
        id: _ticket.id,
      },
    });

    return ticketUpdated;
  }
}

module.exports = new TicketRepository();
