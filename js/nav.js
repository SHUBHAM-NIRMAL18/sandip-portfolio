/**
 * Navigation Module
 * Handles hash-based routing, smooth scrolling, active link highlighting & mobile toggle.
 */

export function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  function updateActiveLink(targetId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${targetId}` || (targetId === '' && href === '#hero');
      link.classList.toggle('active', isMatch);
      link.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });
  }

  function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const targetSection = document.getElementById(hash);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      updateActiveLink(hash);
    }
  }

  // ScrollSpy observer
  const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLink(id);
        if (history.replaceState) history.replaceState(null, '', `#${id}`);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  window.addEventListener('hashchange', handleHashChange);
  if (window.location.hash) handleHashChange();
}
