/**
 * Skills Filter Module
 * Interactive filter tabs for core competencies.
 */

export function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('[data-skill-category]');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-skill-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('skill-card--hidden');
        } else {
          card.classList.add('skill-card--hidden');
        }
      });
    });
  });
}
