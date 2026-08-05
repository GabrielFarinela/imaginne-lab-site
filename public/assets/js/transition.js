(() => {
  const KEY = 'imaginne-transition';
  const overlay = document.getElementById('page-transition');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!overlay || reduceMotion) {
    sessionStorage.removeItem(KEY);
    return;
  }

  if (sessionStorage.getItem(KEY) === 'out') {
    sessionStorage.removeItem(KEY);
    overlay.classList.add('is-visible');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add('is-fading');
        document.documentElement.classList.remove('incoming-transition');
      });
    });
    setTimeout(() => overlay.classList.remove('is-visible', 'is-fading'), 500);
  }

  document.querySelectorAll('a[data-transition]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      overlay.classList.add('is-visible', 'is-writing');
      sessionStorage.setItem(KEY, 'out');
      setTimeout(() => { window.location.href = href; }, 4150);
    });
  });
})();
