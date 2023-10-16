export default function setUser(payload) {
  window.sessionStorage.setItem('user', JSON.stringify(payload));
}
