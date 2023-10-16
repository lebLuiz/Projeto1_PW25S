export default function getUser() {
  const user = window.sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
