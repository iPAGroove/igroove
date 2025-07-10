document.addEventListener('DOMContentLoaded', () => {
  const languageSwitcher = document.getElementById('language-switcher');
  const langOptions = document.querySelectorAll('.lang-option');

  const langs = ['en', 'ru', 'ua'];
  let currentLang = 'en';
  let isExpanded = false;
  let startX = null;
  let isSwiping = false;
  const DRAG_START_THRESHOLD = 10;

  // Функция для установки активного языка
  const setActiveLang = (lang) => {
    currentLang = lang;
    langOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    console.log(`Language set to: ${lang}`);
    localStorage.setItem('userLang', lang); // Сохраняем предпочтение

    // !!! НОВОЕ: Если модальное окно активно, обновляем его контент на новый язык
    if (window.translateActiveModal) { // Проверяем, что функция из modal.js доступна
        window.translateActiveModal(currentLang);
    }
  };

  // Функции для управления состоянием переключателя
  const expandSwitcher = () => {
    if (isExpanded) return;
    isExpanded = true;
    languageSwitcher.classList.remove('collapsed');
    languageSwitcher.classList.add('expanded');
    setActiveLang(currentLang);
    languageSwitcher.style.cursor = 'grabbing';
  };

  const collapseSwitcher = () => {
    if (!isExpanded) return;
    isExpanded = false;
    languageSwitcher.classList.remove('expanded');
    languageSwitcher.classList.add('collapsed');
    setActiveLang(currentLang);
    languageSwitcher.style.cursor = 'grab';
  };

  // Инициализация: установка языка по умолчанию и свернутое состояние
  const savedLang = localStorage.getItem('userLang') || 'en';
  setActiveLang(savedLang);
  collapseSwitcher(); // Начинаем в свернутом состоянии

  // --- Логика для мыши (десктоп) ---
  languageSwitcher.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    startX = e.clientX;
    isSwiping = false;

    if (!isExpanded) {
      expandSwitcher();
    }
    languageSwitcher.style.cursor = 'grabbing';
  });

  languageSwitcher.addEventListener('mousemove', (e) => {
    if (startX === null) return;
    const diffX = Math.abs(e.clientX - startX);
    if (diffX > DRAG_START_THRESHOLD) {
      isSwiping = true;
    }
  });

  languageSwitcher.addEventListener('mouseup', (e) => {
    if (startX === null) return;
    languageSwitcher.style.cursor = 'grab';
    
    const endX = e.clientX;
    const diffX = endX - startX;
    const swipeThreshold = 30;

    if (isSwiping && Math.abs(diffX) > swipeThreshold) {
      let currentIndex = langs.indexOf(currentLang);
      if (diffX < 0) {
          currentIndex = (currentIndex + 1) % langs.length;
      } else {
          currentIndex = (currentIndex - 1 + langs.length) % langs.length;
      }
      setActiveLang(langs[currentIndex]);
    } else {
      if (isExpanded) {
          collapseSwitcher();
      }
    }
    startX = null;
    isSwiping = false;
  });

  // --- Сенсорные события (мобильные) ---
  languageSwitcher.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = false;

    if (!isExpanded) {
      expandSwitcher();
    }
  }, { passive: true });

  languageSwitcher.addEventListener('touchmove', (e) => {
    if (startX === null) return;
    const diffX = Math.abs(e.touches[0].clientX - startX);
    if (diffX > DRAG_START_THRESHOLD) {
      isSwiping = true;
    }
  }, { passive: true });

  languageSwitcher.addEventListener('touchend', (e) => {
    if (startX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    const swipeThreshold = 30;

    if (isSwiping && Math.abs(diffX) > swipeThreshold) {
      let currentIndex = langs.indexOf(currentLang);
      if (diffX < 0) {
          currentIndex = (currentIndex + 1) % langs.length;
      } else {
          currentIndex = (currentIndex - 1 + langs.length) % langs.length;
      }
      setActiveLang(langs[currentIndex]);
    } else {
      if (isExpanded) {
          collapseSwitcher();
      }
    }
    startX = null;
    isSwiping = false;
  }, { passive: true });

  // Обработка кликов непосредственно по опциям языка при развернутом состоянии
  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      if (isExpanded) {
        e.stopPropagation();
        setActiveLang(opt.dataset.lang);
        collapseSwitcher();
      }
    });
  });

  // Сворачивать при клике за пределами переключателя (для лучшего UX)
  document.addEventListener('click', (e) => {
    if (isExpanded && !languageSwitcher.contains(e.target)) {
      collapseSwitcher();
    }
  });
});
