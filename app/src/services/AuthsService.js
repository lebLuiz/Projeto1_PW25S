import HttpClient from './utils/HttpClient.js';
import AuthMapper from './mappers/auth/AuthMapper.js';
import RegisterMapper from './mappers/auth/RegisterMapper.js';

class AuthsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  login(auth) {
    const body = AuthMapper.toPersistence(auth);

    return this.httpClient.post('/auth/login', {
      body,
    });
  }

  register(payload) {
    const body = RegisterMapper.toPersistence(payload);

    return this.httpClient.post('/auth/register', {
      body,
    });
  }
}

export default new AuthsService();
