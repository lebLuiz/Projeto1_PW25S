import removeToken from './auth/token/removeToken.js';
import removeUser from './auth/user/removeUser.js';
import getUser from './auth/user/getUser.js';

const navbar = document.querySelector('.wrapper-links');
const btn_sidebar = document.getElementById('_btn-sidebar');
const btn_exit = document.getElementById('_btn-exit');

function fecharSidebar() {
  navbar.classList.remove('--open');
}
function abrirSidebar() {
  navbar.classList.add('--open');
}
function incluirEventoClickHeaderSidebar() {
  btn_sidebar.addEventListener('click', () => {
    abrirSidebar();
  });
  document.body.addEventListener('click', ($el) => {
    if (navbar.contains($el.target) || btn_sidebar.contains($el.target)) { return; }
    fecharSidebar();
  });
}

function logout() {
  removeToken();
  removeUser();
  window.open(`${window.origin}/`, '_self');
}
function incluirEventoCLickBtnSair() {
  btn_exit.addEventListener('click', () => {
    logout();
  });
}

function removeRouterCategories() {
  const link_route_cateogires = navbar.querySelector('ul #_link-route-categories');
  link_route_cateogires.remove();
}

function handleCheckValidRoutes() {
  const user = getUser();
  if (!user || user?.role !== 'ADMIN') {
    removeRouterCategories();
  }
}

handleCheckValidRoutes();

incluirEventoClickHeaderSidebar();
incluirEventoCLickBtnSair();
