/* eslint-disable no-alert */
import getUser from './auth/user/getUser.js';
import CategoriesService from '../services/CategoriesService.js';
import UsersService from '../services/UsersService.js';
import TicketsService from '../services/TicketsService.js';
import isLoading from './utils/loading.js';

const modalSaveTicket = document.querySelector('#modal-save-ticket');
const modalSaveTecUserRelationshipTicket = document.querySelector('#modal-save-tec-user-relationship-ticket');
const modalSaveStatusTicket = document.querySelector('#modal-save-status-ticket');

const btnCloseModalSaveTicket = document.querySelector('#modal-save-ticket header a');
const btnCloseModalSaveTecUserRelationshipTicket = document.querySelector('#modal-save-tec-user-relationship-ticket header a');
const btnCloseModalSaveStatusTicket = document.querySelector('#modal-save-status-ticket header a');

let user = null;
let tickets = [];
let categories = [];
let tecUsers = [];
let idTicket = null;
const STATUS = [
  'ABERTO',
  'PENDENTE',
  'EM_ESPERA',
  'RESOLVIDO',
  'FECHADO',
];

// - DEFAULT USER
function openModalSaveTicket() {
  modalSaveTicket.classList.remove('hide');
}
function clearRegistrationModalFields() {
  const title = document.getElementsByName('title')[0];
  const description = document.getElementsByName('description')[0];
  const category = document.getElementsByName('category')[0];

  title.value = '';
  description.value = null;
  category.value = null;
}
function closeModalSaveTicket() {
  modalSaveTicket.classList.add('hide');
  clearRegistrationModalFields();
}
btnCloseModalSaveTicket.addEventListener('click', () => {
  closeModalSaveTicket();
});

// - ADMIN
function openModalSaveTecUserRelationshipTicket() {
  modalSaveTecUserRelationshipTicket.classList.remove('hide');
}
function clearTecUserRelationshipTicketModalFields() {
  const tecUser = document.getElementsByName('tec_user')[0];
  tecUser.value = null;
  idTicket = null;
}
function closeModalSaveTecUserRelationshipTicket() {
  modalSaveTecUserRelationshipTicket.classList.add('hide');
  clearTecUserRelationshipTicketModalFields();
}
btnCloseModalSaveTecUserRelationshipTicket.addEventListener('click', () => {
  closeModalSaveTecUserRelationshipTicket();
});

// - TEC
function openModalSaveStatusTicket() {
  modalSaveStatusTicket.classList.remove('hide');
}
function clearStatusTicketModalFields() {
  const status = document.getElementsByName('status')[0];
  const technicalComment = document.getElementsByName('technical_comment')[0];
  status.value = null;
  technicalComment.value = null;
  idTicket = null;
}
function closeModalSaveStatusTicket() {
  modalSaveStatusTicket.classList.add('hide');
  clearStatusTicketModalFields();
}
btnCloseModalSaveStatusTicket.addEventListener('click', () => {
  closeModalSaveStatusTicket();
});

// ACTIONS CALL SERVICES:
// - ADMIN
async function getAllTecUsers() {
  try {
    const callAllTecUsers = await UsersService.getAllTecs();

    tecUsers = callAllTecUsers.data;
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}
async function getAllTickets() {
  try {
    const callAllTickets = await TicketsService.getAll();

    tickets = callAllTickets.data;
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}
async function updateTecUserRelationshipTicket(payload) {
  try {
    const callUpdate = await TicketsService.updateTecUser(payload);

    window.alert(callUpdate.msg || 'Alterado com sucesso!');
    window.location.reload();
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

// - TEC
async function getAllTicketsByUserTec() {
  try {
    const callAllTickets = await TicketsService.getAllByUserTec();

    tickets = callAllTickets.data;
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}
async function updateStatusTicket(payload) {
  try {
    const callUpdate = await TicketsService.updateStatus(payload);

    window.alert(callUpdate.msg || 'Alterado com sucesso!');
    window.location.reload();
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

// - DEFAULT USER
async function getAllCategories() {
  try {
    const callAllcategories = await CategoriesService.getAll();

    categories = callAllcategories.data;
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}
async function getAllTicketsByUser() {
  try {
    const callAllTickets = await TicketsService.getAllByUser();

    tickets = callAllTickets.data;
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}
async function registerTicket(payload) {
  try {
    const callRegister = await TicketsService.register(payload);

    window.alert(callRegister.msg || 'Criado com sucesso!');
    clearRegistrationModalFields();
    window.location.reload();
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

// FUNCTIONS HANDLE FORM
// - ADMIN
function handleSubmitFormModalSaveTecUserRelationshipTicket(payload) {
  updateTecUserRelationshipTicket(payload);
}

// - TEC
function handleSubmitFormModalSaveStatusTicket(payload) {
  updateStatusTicket(payload);
}

// - DEFAULT USER
function handleSubmitFormSave(payload) {
  registerTicket(payload);
}

// - TEC
function handleSelectValueStatusTicketForm({ status, technical_comment }) {
  const selectStatus = document.getElementsByName('status')[0];
  const technicalComment = document.getElementsByName('technical_comment')[0];

  const containsStatus = STATUS.includes(status);
  selectStatus.value = containsStatus ? status : null;
  technicalComment.value = technical_comment;
}

// - TEC
function handleFormEditStatusTicket({ id, status, technical_comment }) {
  idTicket = id;
  openModalSaveStatusTicket();
  handleSelectValueStatusTicketForm({ status, technical_comment });
}

// - ADMIN:
function handleValuesTechnicalRelationshipForm() {
  const selectTecUser = document.getElementsByName('tec_user')[0];
  tecUsers.forEach((tecUser) => {
    const optionTecUser = document.createElement('option');
    optionTecUser.value = tecUser.id;
    optionTecUser.innerText = tecUser.name;
    selectTecUser.append(optionTecUser);
  });
}

// - ADMIN
function handleEventListenerSubmitInFormModalSaveTecUserRelationshipTicket() {
  const formTecUserRelationshipTicket = modalSaveTecUserRelationshipTicket.querySelector('#_form-tec-user-relationship-ticket');

  formTecUserRelationshipTicket.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectTecUser = document.getElementsByName('tec_user')[0];
    handleSubmitFormModalSaveTecUserRelationshipTicket({
      id: idTicket,
      id_user_tec: selectTecUser.value,
    });
  });
}

// - ADMIN
function handleEventListenerBtnClearValueInFormModalSaveTecUserRelationshipTicket() {
  const btnClearTecUserRelationshipTicket = modalSaveTecUserRelationshipTicket.querySelector('#_form-tec-user-relationship-ticket #_btn-clear-value-tec-user');

  btnClearTecUserRelationshipTicket.addEventListener('click', () => {
    const tecUser = document.getElementsByName('tec_user')[0];
    tecUser.value = null;
  });
}

// - ADMIN
function handleSelectValueTechnicalRelationshipForm(id_user_tec) {
  const selectTecUser = document.getElementsByName('tec_user')[0];
  const containsTechnicalUser = (tecUsers.findIndex(({ id }) => id === id_user_tec) !== -1);
  selectTecUser.value = containsTechnicalUser ? id_user_tec : null;
}

// - ADMIN
function handleTechnicianAssignment({ id, id_user_tec }) {
  idTicket = id;
  openModalSaveTecUserRelationshipTicket();
  handleSelectValueTechnicalRelationshipForm(id_user_tec);
}

// - TEC
function handleEventListenerSubmitInFormModalSaveStatusTicket() {
  const formStatusTicket = modalSaveStatusTicket.querySelector('#_form-status-ticket');

  formStatusTicket.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectStatus = document.getElementsByName('status')[0];
    const inputTechnicalComment = document.getElementsByName('technical_comment')[0];
    handleSubmitFormModalSaveStatusTicket({
      id: idTicket,
      status: selectStatus.value,
      technical_comment: inputTechnicalComment.value,
    });
  });
}

// - TEC
function handleValuesStatusTicketForm() {
  const selectStatus = document.getElementsByName('status')[0];

  STATUS.forEach((status) => {
    const optionStatus = document.createElement('option');
    optionStatus.value = status;
    optionStatus.innerText = status.replace('_', ' ');
    selectStatus.append(optionStatus);
  });
}

// - DEFAULT USER
function handleShowButtonNewTicket() {
  const header = document.querySelector('#page-tickets ._content main header');
  const btnNewTicket = document.createElement('button');
  btnNewTicket.id = '_btn-new-ticket';
  btnNewTicket.type = 'button';
  btnNewTicket.classList.add('_default-button');
  btnNewTicket.innerText = 'Registrar novo ticket';

  btnNewTicket.addEventListener('click', () => {
    openModalSaveTicket();
  });

  header.append(btnNewTicket);
}

// - DEFAULT USER
function valueCategoriesInSelect() {
  const selectCategories = document.getElementsByName('category')[0];

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.innerText = category.name;
    selectCategories.append(option);
  });

  selectCategories.value = null;
}

// - DEFAULT USER
function handleValuesFormTicket() {
  const inputDescription = document.getElementsByName('description')[0];
  inputDescription.value = '';
  valueCategoriesInSelect();
}

function valueDataInTable() {
  const tableThead = document.getElementById('_table-thead-tickets');
  const tableBody = document.getElementById('_table-body-tickets');
  const user_is_tec = user.role === 'TEC';
  const user_is_admin = user.role === 'ADMIN';

  if (user_is_tec || user_is_admin) {
    const tr = tableThead.querySelector('tr');
    const th_actions = document.createElement('th');
    th_actions.innerText = 'Ações';

    tr.append(th_actions);
  }

  tickets.forEach(({
    id, title, category, description, status, technical_comment, id_user_tec,
  }) => {
    const row = document.createElement('tr');
    const id_btn_edit_status_ticket = `_btn-edit-status-ticket_${id}`;
    const id_btn_edit_tec_user_ticket = `_btn-edit-tec-user-ticket_${id}`;

    let td_actions = '';
    if (user_is_tec) {
      td_actions = `
        <td>
          <div class="_actions">
            <button
              id="${id_btn_edit_status_ticket}">
              Alterar Status
            </button>
          </div>
        </td>
      `;
    } else if (user_is_admin) {
      td_actions = `
        <td>
          <div class="_actions">
            <button
              id="${id_btn_edit_tec_user_ticket}">
              Atribuir/Remover Técnico
            </button>
          </div>
        </td>
      `;
    }

    row.innerHTML = `
      <td>${id}</td>
      <td>${title}</td>
      <td>${category?.name || '--'}</td>
      <td>${description}</td>
      <td class="_status --${status}">${status.replace('_', ' ')}</td>
      <td>${technical_comment || '--'}</td>
      ${td_actions}
    `;

    tableBody.appendChild(row);

    if (user_is_tec) {
      const btn_edit_status_ticket = row.querySelector(`#${id_btn_edit_status_ticket}`);
      btn_edit_status_ticket.addEventListener('click', () => {
        handleFormEditStatusTicket({
          id,
          status,
          technical_comment,
        });
      });
    } else if (user_is_admin) {
      const btn_edit_tec_user_ticket = row.querySelector(`#${id_btn_edit_tec_user_ticket}`);

      btn_edit_tec_user_ticket.addEventListener('click', () => {
        handleTechnicianAssignment({
          id,
          id_user_tec,
        });
      });
    }
  });
}

// - DEFAULT USER
function handleEventListenerSubmitInFormModalTicket() {
  const formTicket = modalSaveTicket.querySelector('#_form-ticket');
  formTicket.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementsByName('title')[0].value;
    const description = document.getElementsByName('description')[0].value;
    const category = document.getElementsByName('category')[0].value;
    handleSubmitFormSave({
      title,
      description,
      category,
    });
  });
}

async function handleRender() {
  isLoading();
  if (user.role === 'ADMIN') {
    await getAllTecUsers();
    await getAllTickets();
    handleValuesTechnicalRelationshipForm();
    handleEventListenerSubmitInFormModalSaveTecUserRelationshipTicket();
    handleEventListenerBtnClearValueInFormModalSaveTecUserRelationshipTicket();
  } else if (user.role === 'TEC') {
    await getAllTicketsByUserTec();
    handleValuesStatusTicketForm();
    handleEventListenerSubmitInFormModalSaveStatusTicket();
  } else {
    await getAllCategories();
    await getAllTicketsByUser();

    handleShowButtonNewTicket();
    handleValuesFormTicket();
    handleEventListenerSubmitInFormModalTicket();
  }

  valueDataInTable();
}

window.onload = () => {
  user = getUser();
  if (!user) {
    window.open(`${window.origin}/`, '_self');
  } else {
    handleRender();
  }
};
