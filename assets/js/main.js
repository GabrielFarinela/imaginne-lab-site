(() => {
  const root = document.documentElement;
  const stored = localStorage.getItem('imaginne-theme');
  if (stored) root.setAttribute('data-theme', stored);

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('imaginne-theme', next);
  });

  const burger = document.querySelector('.nav-burger');
  burger?.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
  document.querySelectorAll('.mobile-panel a').forEach((link) => {
    link.addEventListener('click', () => document.body.classList.remove('nav-open'));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.style.setProperty('--i', i);
        child.setAttribute('data-reveal', '');
      });
    });

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('[data-reveal-group] > *').forEach((el) => el.classList.add('is-visible'));
  }
})();
