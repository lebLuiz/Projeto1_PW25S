import getToken from '../scripts/auth/token/getToken.js';
import HttpClient from './utils/HttpClient.js';
import TicketMapper from './mappers/ticket/TicketMapper.js';

class TicketsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  getAll() {
    const token = getToken();
    return this.httpClient.get('/tickets', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getAllByUserTec() {
    const token = getToken();
    return this.httpClient.get('/tickets/list/tecs', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getAllByUser() {
    const token = getToken();
    return this.httpClient.get('/tickets/list', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  register(payload) {
    const token = getToken();
    const body = TicketMapper.toPersistence(payload);

    return this.httpClient.post('/tickets', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body,
    });
  }

  update(payload) {
    const token = getToken();
    const body = TicketMapper.toPersistence(payload);

    return this.httpClient.put('/tickets', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body,
    });
  }

  delete(id) {
    const token = getToken();

    return this.httpClient.delete(`/tickets/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  updateTecUser(payload) {
    const token = getToken();
    const body = TicketMapper.toPersistenceTecUser(payload);

    return this.httpClient.put('/tickets/tec', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body,
    });
  }

  updateStatus(payload) {
    const token = getToken();
    const body = TicketMapper.toPersistenceStatus(payload);

    return this.httpClient.put('/tickets/status', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body,
    });
  }
}

export default new TicketsService();
