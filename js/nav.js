/**
 * Navigation Module
 * Smooth scrolling, active link highlighting & mobile toggle without hash in URL.
 */

export function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .brand-logo');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  // Strip #hero hash immediately if present on page load
  if (window.location.hash === '#hero') {
    history.replaceState(null, '', window.location.pathname);
  }

  function updateActiveLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${targetId}` || (targetId === 'hero' && href === '#hero') || (!targetId && href === '#about');
      link.classList.toggle('active', isMatch);
      link.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });
  }

  // Smooth scroll handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('#') || href === '#')) {
        e.preventDefault();
        const targetId = href.replace('#', '');
        if (!targetId || targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          history.replaceState(null, '', window.location.pathname);
          updateActiveLink('hero');
        } else {
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', `#${targetId}`);
            updateActiveLink(targetId);
          }
        }
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ScrollSpy observer: keeps URL clean at top (no #hero), updates for other sections
  const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLink(id);
        if (id === 'hero') {
          history.replaceState(null, '', window.location.pathname);
        } else {
          history.replaceState(null, '', `#${id}`);
        }
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
