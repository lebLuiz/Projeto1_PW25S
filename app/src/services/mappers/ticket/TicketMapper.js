class TicketMapper {
  // Captura objeto do Front e transforma no objeto que deseja enviar pro Back.
  toPersistence(domainTicket) {
    return {
      id: domainTicket.id,
      title: domainTicket.title,
      description: domainTicket.description,
      id_category: Number(domainTicket.category),
    };
  }

  toPersistenceTecUser(domainTicket) {
    return {
      id: domainTicket.id,
      id_user_tec: Number(domainTicket.id_user_tec) || null,
    };
  }

  toPersistenceStatus(domainTicket) {
    return {
      id: domainTicket.id,
      status: domainTicket.status || null,
      technical_comment: domainTicket.technical_comment || null,
    };
  }

  toDomain(persistenceTicket) {
    return {
      id: persistenceTicket.id,
      name: persistenceTicket.name,
    };
  }
}

export default new TicketMapper();
