/* ═══════════════════════════════════════════════
   HAY Wine List — script.js
   Features:
   - Active nav highlight on scroll
   - IntersectionObserver reveal for wine entries
════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-based active nav link ─────────────
  const sections = document.querySelectorAll('.menu-section');
  const navLinks = document.querySelectorAll('.section-nav a');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ── Reveal wine entries as they enter viewport ─
  const entries = document.querySelectorAll('.wine-entry');

  const entryObserver = new IntersectionObserver((observed) => {
    observed.forEach(obs => {
      if (obs.isIntersecting) {
        obs.target.style.animationPlayState = 'running';
        entryObserver.unobserve(obs.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

  entries.forEach((entry, i) => {
    // Pause animation until element is in view
    entry.style.animationPlayState = 'paused';
    entry.style.animationDelay = `${Math.min(i % 12 * 0.04, 0.36)}s`;
    entryObserver.observe(entry);
  });

});