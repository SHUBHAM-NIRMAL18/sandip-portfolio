/**
 * Navigation Module
 * Smooth scrolling, active link highlighting & mobile toggle without hash in URL.
 */

export function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .brand-logo');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  // Strip any existing hash immediately
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  function updateActiveLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${targetId}` || (targetId === 'hero' && href === '#hero');
      link.classList.toggle('active', isMatch);
      link.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });
  }

  // Smooth scroll without altering the URL with hashtags
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          updateActiveLink(targetId);
        }
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ScrollSpy observer (highlights active link without changing URL)
  const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLink(id);
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

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}
