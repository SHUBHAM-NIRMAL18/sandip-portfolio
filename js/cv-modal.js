/**
 * CV Modal Module
 * Handles opening, closing, and printing of the in-browser CV preview modal.
 */

export function initCVModal() {
  const openBtns = document.querySelectorAll('[data-open-cv-modal]');
  const modal = document.getElementById('cv-modal');
  const closeBtn = document.getElementById('cv-modal-close');
  const printBtn = document.getElementById('cv-modal-print');

  if (!modal) return;

  function openModal() {
    modal.classList.add('cv-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('cv-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  // Close on outside overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('cv-modal--open')) {
      closeModal();
    }
  });

  // Print CV button inside modal
  printBtn?.addEventListener('click', () => {
    window.print();
  });
}
