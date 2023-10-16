export default function isLoading(time = 500) {
  const loadingOverlay = document.getElementById('_loading-overlay');
  loadingOverlay.style.display = 'block';

  setTimeout(() => {
    loadingOverlay.style.display = 'none';
  }, time);
}
