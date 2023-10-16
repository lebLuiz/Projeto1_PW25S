/* eslint-disable no-alert */
import AuthsService from '../services/AuthsService.js';
import getUser from './auth/user/getUser.js';
import setToken from './auth/token/setToken.js';
import setUser from './auth/user/setUser.js';
import verifyAuth from './auth/checkAuth.js';

async function handleLogin({ email, password }) {
  try {
    const callLogin = await AuthsService.login({ email, password });
    setToken(callLogin.token);

    const checkedUser = await verifyAuth();
    if (!checkedUser) {
      throw Error('Inválido!');
    } else {
      setUser(checkedUser);
      window.open(`${window.origin}/home`, '_self');
    }
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

function handleRender() {
  const formulario = document.getElementById('_form-login');

  formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    handleLogin({
      email,
      password,
    });
  });
}

window.onload = async () => {
  const user = getUser();
  if (user) {
    window.open(`${window.origin}/home`, '_self');
  } else {
    handleRender();
  }
};
