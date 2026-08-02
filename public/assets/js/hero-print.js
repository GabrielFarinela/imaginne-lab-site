(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.getElementById('print-build');
  const frame = document.querySelector('[data-print-frame]');
  const hint = document.querySelector('[data-print-hint]');
  const nav = document.querySelector('.nav');
  if (!section || !frame) return;

  gsap.registerPlugin(ScrollTrigger);

  const navOffset = () => (nav ? nav.offsetHeight : 0);

  hint?.classList.add('is-armed');

  const update = (progress) => {
    frame.style.setProperty('--p', progress.toFixed(4));
    hint?.classList.toggle('is-done', progress > 0.03);
  };

  update(0);

  ScrollTrigger.create({
    trigger: section,
    start: () => `top ${navOffset()}px`,
    end: () => '+=' + Math.round(window.innerHeight * 0.85),
    pin: true,
    scrub: 0.6,
    invalidateOnRefresh: true,
    onUpdate: (self) => update(self.progress),
  });
})();
