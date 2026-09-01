/**
 * Document & PDF Modal Module
 * Handles opening, closing, dynamic loading, printing, and downloading
 * for CVs, research papers, Duolingo scores, and certificates.
 */

export function initCVModal() {
  const modal = document.getElementById('cv-modal');
  if (!modal) return;

  const titleEl = document.getElementById('cv-modal-heading');
  const iframeEl = modal.querySelector('.cv-modal-frame');
  const downloadLink = document.getElementById('cv-modal-download');
  const openNewTabLink = document.getElementById('cv-modal-external');
  const closeBtn = document.getElementById('cv-modal-close');
  const printBtn = document.getElementById('cv-modal-print');

  function openModal(docUrl, docTitle, downloadName) {
    if (!docUrl) return;

    if (titleEl) {
      titleEl.innerHTML = docTitle || 'Document Preview';
    }

    if (iframeEl) {
      iframeEl.src = docUrl;
    }

    if (downloadLink) {
      downloadLink.href = docUrl;
      downloadLink.download = downloadName || docUrl.split('/').pop() || 'document.pdf';
    }

    if (openNewTabLink) {
      openNewTabLink.href = docUrl;
    }

    modal.classList.add('cv-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('cv-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset iframe after transition to save memory
    setTimeout(() => {
      if (!modal.classList.contains('cv-modal--open') && iframeEl) {
        iframeEl.src = 'about:blank';
      }
    }, 300);
  }

  // Delegation: Listen to all triggers for document previews
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-doc-modal], [data-open-cv-modal]');
    if (!trigger) return;

    e.preventDefault();

    const docUrl = trigger.getAttribute('data-doc-url') || trigger.getAttribute('href') || 'assets/Sandip_Nirmal_CVs.pdf';
    const docTitle = trigger.getAttribute('data-doc-title') || 'Curriculum Vitae — Sandip Nirmal, MS';
    const downloadName = trigger.getAttribute('data-doc-download') || 'Sandip_Nirmal_Document.pdf';

    openModal(docUrl, docTitle, downloadName);
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

  // Print document button inside modal
  printBtn?.addEventListener('click', () => {
    if (iframeEl && iframeEl.contentWindow) {
      try {
        iframeEl.contentWindow.focus();
        iframeEl.contentWindow.print();
        return;
      } catch (err) {
        console.warn('Direct iframe print blocked by CORS or viewer:', err);
      }
    }
    window.print();
  });
}
