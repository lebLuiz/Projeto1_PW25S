import getToken from '../scripts/auth/token/getToken.js';
import HttpClient from './utils/HttpClient.js';
import CategoryMapper from './mappers/category/CategoryMapper.js';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  getAll() {
    const token = getToken();
    return this.httpClient.get('/categories', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  register(payload) {
    const token = getToken();
    const body = CategoryMapper.toPersistence(payload);

    return this.httpClient.post('/categories', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body,
    });
  }

  update(payload) {
    const token = getToken();
    const body = CategoryMapper.toPersistence(payload);

    return this.httpClient.put('/categories', {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body,
    });
  }

  delete(id) {
    const token = getToken();

    return this.httpClient.delete(`/categories/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new CategoriesService();
