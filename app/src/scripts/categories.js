/* eslint-disable no-alert */
import getUser from './auth/user/getUser.js';
import CategoriesService from '../services/CategoriesService.js';
import isLoading from './utils/loading.js';

const btnNewCategory = document.getElementById('_btn-new-category');
const modalRegister = document.querySelector('#modal-save-category');
const close = document.querySelector('#modal-save-category header a');
const formCategory = modalRegister.querySelector('#_form-category');

let user = null;
let id_category = 0;
let categories = [];

function clearRegistrationModalFields() {
  const categoria = document.getElementsByName('category')[0];
  const titleModal = modalRegister.querySelector('#_title-modal');

  titleModal.innerHTML = 'Cadastrar Categoria';
  categoria.value = '';
  id_category = 0;
}

function closeModal() {
  modalRegister.classList.add('hide');
  clearRegistrationModalFields();
}

function openModal() {
  modalRegister.classList.remove('hide');
}

close.addEventListener('click', () => {
  closeModal();
});

async function getAllCategories() {
  try {
    const callAllcategories = await CategoriesService.getAll();

    categories = callAllcategories.data;
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

async function registerCategory(payload) {
  try {
    const callRegister = await CategoriesService.register(payload);

    window.alert(callRegister.msg || 'Criado com sucesso!');
    clearRegistrationModalFields();
    window.location.reload();
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

async function editCategory(payload) {
  try {
    const callRegister = await CategoriesService.update(payload);

    window.alert(callRegister.msg || 'Alterado com sucesso!');
    clearRegistrationModalFields();
    window.location.reload();
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

async function removeCategory(id) {
  try {
    const callDeleteRegister = await CategoriesService.delete(id);

    window.alert(callDeleteRegister.msg || 'Removido com sucesso!');
    window.location.reload();
  } catch (err) {
    window.alert(err.message || 'Algo inesperado aconteceu, tente novamente mais tarde');
  }
}

function handleSubmitFormSave(payload) {
  if (payload.id) {
    editCategory(payload);
  } else {
    registerCategory(payload);
  }
}

function handleFormEditCategory({ id, name }) {
  const tituloModal = modalRegister.querySelector('#_title-modal');
  tituloModal.innerHTML = '✏️ Editar Categoria';

  const labelIdCategory = formCategory.querySelector('._field-group ._field #_id-category');
  const inputCategory = document.getElementsByName('category')[0];

  id_category = id;
  labelIdCategory.innerHTML = `ID: ${id}`;
  inputCategory.value = name;

  openModal();
}

function handleDeleteCategory({ id, name }) {
  const confirmDelete = window.confirm(`⭕ Tem certeza que deseja remover a categoria: ${name} ?`);

  if (confirmDelete) {
    removeCategory(id);
  }
}

function handleShowButtonNewCategory() {
  btnNewCategory.addEventListener('click', () => {
    const labelIdCategory = formCategory.querySelector('._field-group ._field #_id-category');
    labelIdCategory.innerHTML = '';
    id_category = 0;
    openModal();
  });
}

function valueDataInTable() {
  const tableBody = document.getElementById('_table-body-categories');

  categories.forEach(({ id, name }) => {
    const row = document.createElement('tr');
    const id_btn_edit_category = `_btn-edit-category_${id}`;
    const id_btn_delete_category = `_btn-delete-category_${id}`;

    row.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>
        <div class="_actions">
          <button
            id="${id_btn_edit_category}">
            Editar
          </button>

          <button
            id="${id_btn_delete_category}">
            Excluir
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);

    const btn_edit_category = row.querySelector(`#${id_btn_edit_category}`);
    const btn_delete_category = row.querySelector(`#${id_btn_delete_category}`);

    btn_edit_category.addEventListener('click', () => {
      handleFormEditCategory({ id, name });
    });

    btn_delete_category.addEventListener('click', () => {
      handleDeleteCategory({ id, name });
    });
  });
}

function handleEventListenerSubmitInFormModalCategory() {
  formCategory.addEventListener('submit', (event) => {
    event.preventDefault();

    const _id = id_category;
    const _categoria = document.getElementsByName('category')[0];
    handleSubmitFormSave({ id: _id, name: _categoria.value });
  });
}

async function handleRender() {
  isLoading();
  await getAllCategories()
    .then(() => {
      handleShowButtonNewCategory();
      valueDataInTable();
      handleEventListenerSubmitInFormModalCategory();
    });
}

window.onload = () => {
  user = getUser();
  if (!user || user?.role !== 'ADMIN') {
    window.open(`${window.origin}/`, '_self');
  } else {
    handleRender();
  }
};
