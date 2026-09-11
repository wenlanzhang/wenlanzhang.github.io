(function () {
  var themeButtons = document.querySelectorAll('[data-filter="theme"] button');
  var cards = document.querySelectorAll('.talk-card');
  var hoverNone = window.matchMedia('(hover: none)').matches;
  var theme = 'all';

  function setActive(buttons, selected) {
    buttons.forEach(function (btn) {
      var active = btn === selected;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyFilters() {
    cards.forEach(function (card) {
      var themes = (card.getAttribute('data-themes') || '').split(/\s+/).filter(Boolean);
      var show = theme === 'all' || themes.indexOf(theme) !== -1;
      card.hidden = !show;
      if (!show) card.classList.remove('is-open');
    });
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      theme = btn.getAttribute('data-theme');
      setActive(themeButtons, btn);
      applyFilters();
    });
  });

  if (!hoverNone) return;

  cards.forEach(function (card) {
    card.addEventListener('click', function (event) {
      if (event.target.closest('a')) return;
      var open = card.classList.contains('is-open');
      cards.forEach(function (other) {
        other.classList.remove('is-open');
      });
      if (!open) card.classList.add('is-open');
    });
  });
})();
