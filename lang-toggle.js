(function () {
  var toggle = document.querySelector('.lang-toggle');
  if (!toggle) return;

  var buttons = toggle.querySelectorAll('.lang-btn');
  var panels = document.querySelectorAll('[data-lang]:not(.lang-btn)');

  function showLang(lang) {
    buttons.forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.lang !== lang;
    });

    document.documentElement.lang = lang;

    try {
      localStorage.setItem('bio-lang', lang);
    } catch (e) {}
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      showLang(btn.dataset.lang);
    });
  });

  var saved = null;
  try {
    saved = localStorage.getItem('bio-lang');
  } catch (e) {}

  if (saved === 'zh' || saved === 'en') {
    showLang(saved);
  }
})();
