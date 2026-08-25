/**
 * Main Application Module
 * Coordinates initialization, theme toggling, forms & clipboard actions.
 */

import { initNavigation } from './nav.js';
import { initAnimations } from './animations.js';
import { initChatbot } from './chatbot.js';
import { initCounters } from './counters.js';
import { initSkillsFilter } from './skills-filter.js';
import { initCVModal } from './cv-modal.js';
import { initDashboard } from './dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
  // Always start at the top on page load/refresh
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }
  window.scrollTo(0, 0);

  initPreloader();
  initNavigation();
  initAnimations();
  initCounters();
  initSkillsFilter();
  initCVModal();
  initDashboard();
  initThemeToggle();
  initContactForm();
  initCopyButtons();
  initChatbot();
  initFooterYear();
});

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('preloader--hidden');
    setTimeout(() => {
      if (preloader.parentNode) preloader.remove();
    }, 550);
  };

  // Ensure preloader displays smoothly for a minimum of 450ms then fades
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 450);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 450));
    setTimeout(hidePreloader, 2000); // Safety fallback
  }
}

function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(toggleBtn, savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(toggleBtn, next);
    });
  }
}

function updateThemeIcon(btn, theme) {
  if (!btn) return;
  btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
  btn.innerHTML = theme === 'light' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const subject = form.querySelector('#subject')?.value.trim() || 'Inquiry from Portfolio';
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      statusMsg.textContent = 'Please fill out all required fields.';
      statusMsg.style.color = '#ef4444';
      return;
    }

    const mailtoUri = `mailto:sandipnirmal802@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUri;

    statusMsg.textContent = 'Opening your email client...';
    statusMsg.style.color = 'var(--accent-teal)';
    form.reset();
  });
}

function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;
      try {
        await navigator.clipboard.writeText(textToCopy);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      } catch (err) { console.warn('Copy failed:', err); }
    });
  });
}

function initFooterYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}
