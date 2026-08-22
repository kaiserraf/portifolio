const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ano dinâmico no rodapé
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Menu mobile
const navToggle = document.getElementById('navToggle');
const routes = document.querySelector('.routes');
if (navToggle && routes) {
  navToggle.addEventListener('click', () => {
    const isOpen = routes.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  routes.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      routes.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal ao rolar a página
const revealEls = document.querySelectorAll('.section, .project-card');
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
