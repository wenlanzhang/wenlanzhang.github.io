(function () {
  var yearButtons = document.querySelectorAll('[data-filter="year"] button');
  var themeButtons = document.querySelectorAll('[data-filter="theme"] button');
  var cards = document.querySelectorAll('.talk-card');
  var hoverNone = window.matchMedia('(hover: none)').matches;
  var year = 'all';
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
      var yearOk = year === 'all' || card.getAttribute('data-year') === year;
      var themes = (card.getAttribute('data-themes') || '').split(/\s+/).filter(Boolean);
      var themeOk = theme === 'all' || themes.indexOf(theme) !== -1;
      var show = yearOk && themeOk;
      card.hidden = !show;
      if (!show) card.classList.remove('is-open');
    });
  }

  yearButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      year = btn.getAttribute('data-year');
      setActive(yearButtons, btn);
      applyFilters();
    });
  });

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
