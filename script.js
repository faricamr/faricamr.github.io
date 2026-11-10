(function () {
  'use strict';

  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    const trigger = card.querySelector('.project-card__summary');
    if (!trigger) return;

    function toggleCard(e) {
      // Prevent toggling if user clicks a direct external link inside
      if (e.target.tagName.toLowerCase() === 'a') return;

      const isExpanded = card.classList.contains('is-expanded');

      // Close other cards for clean reading focus
      cards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains('is-expanded')) {
          otherCard.classList.remove('is-expanded');
          const otherTrigger = otherCard.querySelector('.project-card__summary');
          if (otherTrigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            const arrow = otherCard.querySelector('.arrow');
            if (arrow) arrow.textContent = '+';
          }
        }
      });

      // Toggle this card
      card.classList.toggle('is-expanded', !isExpanded);
      trigger.setAttribute('aria-expanded', String(!isExpanded));

      const arrow = card.querySelector('.arrow');
      if (arrow) {
        arrow.textContent = isExpanded ? '+' : '−';
      }

      // Smooth scroll into view when opened
      if (!isExpanded) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    trigger.addEventListener('click', toggleCard);

    // Keyboard accessibility
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(e);
      }
    });
  });

})();
