/* eslint-disable no-alert */
import AuthsService from '../services/AuthsService.js';
import getUser from './auth/user/getUser.js';
import isLoading from './utils/loading.js';

let user = null;
const modalRegister = document.querySelector('#modal-register');
const close = document.querySelector('#modal-register header a');

function clearRegistrationModalFields() {
  const name = document.getElementsByName('name')[0];
  const email = document.getElementsByName('email')[0];
  const password = document.getElementsByName('password')[0];
  const confirmPassword = document.getElementsByName('confirmPassword')[0];

  name.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
}

close.addEventListener('click', () => {
  modalRegister.classList.add('hide');
  clearRegistrationModalFields();
});

function handleRender() {
  const typeUser = user.role || 'DEFAULT';
  const title = document.querySelector('main h1');
  const typeUserElement = document.querySelector('main ._tag-type-user');
  const classTypeUser = `--${typeUser}`;
  const txtTypeUser = () => ({
    ADMIN: 'Administrador',
    TEC: 'Técnico de Suporte',
    DEFAULT: 'Usuário',
  }[typeUser || 'DEFAULT']);

  title.innerHTML = `Bem vindo ${user.name || ''}!`;
  typeUserElement.classList.add(classTypeUser);
  typeUserElement.querySelector('strong').innerText = txtTypeUser();
}

function handleAppearanceBtnRegisterUserTec() {
  if (user.role === 'ADMIN') {
    const btnRegisterUser = document.createElement('button');
    btnRegisterUser.id = 'btn-register';
    btnRegisterUser.classList.add('_default-button');
    btnRegisterUser.innerHTML = `
      <span>Cadastrar Técnico de Suporte 🧑‍💻</span>
    `;

    const main = document.querySelector('#page-home main');
    main.append(btnRegisterUser);

    btnRegisterUser.addEventListener('click', () => {
      modalRegister.classList.remove('hide');
    });
  }
}

async function handleRegister(payload) {
  try {
    const callRegister = await AuthsService.register(payload);

    window.alert(callRegister.msg || 'Criado com sucesso!');
    window.open(`${window.origin}/home`, '_self');
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

function handleRegistrationDataValorization() {
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
      role: 'TEC',
      idUserRelation: user.id,
    });
  });
}

window.onload = () => {
  user = getUser();
  if (!user) {
    window.open(`${window.origin}/login`, '_self');
  } else {
    isLoading();
    handleRender();
    handleAppearanceBtnRegisterUserTec();
    handleRegistrationDataValorization();
  }
};
