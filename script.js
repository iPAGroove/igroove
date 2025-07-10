document.addEventListener('DOMContentLoaded', () => {
  const selected = document.getElementById('lang-selected');
  const optionsContainer = document.getElementById('lang-options');
  const options = document.querySelectorAll('.lang-option');
  let currentLang = 'en';

  const setActiveLang = (lang) => {
    currentLang = lang;
    selected.textContent = lang.toUpperCase();
    options.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    console.log(`Language set to: ${lang}`);
    // localStorage.setItem('userLang', lang);
  };

  // Показываем/скрываем список языков при клике
  selected.addEventListener('click', () => {
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
  });

  // Свайп: влево/вправо
  let startX = null;
  selected.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  selected.addEventListener('touchend', e => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 30) {
      const langs = ['en', 'ru', 'ua'];
      let i = langs.indexOf(currentLang);
      if (diff < 0) i = (i + 1) % langs.length;
      else i = (i - 1 + langs.length) % langs.length;
      setActiveLang(langs[i]);
    }
    startX = null;
  });

  // Выбор языка по клику
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      setActiveLang(lang);
      optionsContainer.style.display = 'none';
    });
  });

  // Начальный язык
  setActiveLang('en');
});
