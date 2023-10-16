/* eslint-disable no-empty */
import UsersService from '../../services/UsersService.js';
import getToken from './token/getToken.js';

export default async function verifyAuth() {
  const token = getToken();
  let res = null;

  if (!token) {
    return res;
  }

  try {
    const userCheck = await UsersService.me();
    res = userCheck;
  } catch {}

  return res;
}
