/* eslint-disable no-alert */
import AuthsService from '../services/AuthsService.js';

async function handleRegister(payload) {
  try {
    const callRegister = await AuthsService.register(payload);

    window.alert(callRegister.msg || 'Criado com sucesso!');
    window.open(`${window.origin}/login`, '_self');
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

function handleRender() {
  const formulario = document.getElementById('_form-register');

  formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementsByName('name')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const confirmPassword = document.getElementsByName('confirmPassword')[0].value;

    handleRegister({
      name,
      email,
      password,
      confirmPassword,
    });
  });
}

window.onload = async () => {
  handleRender();
};
