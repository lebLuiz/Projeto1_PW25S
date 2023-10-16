import getToken from '../scripts/auth/token/getToken.js';
import HttpClient from './utils/HttpClient.js';

class UsersService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async me() {
    const token = getToken();
    const user = await this.httpClient.get('/user/me', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return user;
  }

  async getAllTecs() {
    const token = getToken();
    const users = await this.httpClient.get('/user/tecs/list', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return users;
  }
}

export default new UsersService();
