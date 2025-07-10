document.addEventListener('DOMContentLoaded', () => {
  const languageSwitcher = document.getElementById('language-switcher');
  const langOptions = document.querySelectorAll('.lang-option');

  const langs = ['en', 'ru', 'ua'];
  let currentLang = 'en';
  let isExpanded = false;
  let startX = null;
  let isSwiping = false; // Флаг, указывающий, что был значительный сдвиг (свайп)
  const DRAG_START_THRESHOLD = 10; // Минимальный сдвиг в пикселях для начала "свайпа"

  // Функция для установки активного языка
  const setActiveLang = (lang) => {
    currentLang = lang;
    langOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    console.log(`Language set to: ${lang}`);
    localStorage.setItem('userLang', lang); // Сохраняем предпочтение
  };

  // Функции для управления состоянием переключателя
  const expandSwitcher = () => {
    if (isExpanded) return;
    isExpanded = true;
    languageSwitcher.classList.remove('collapsed');
    languageSwitcher.classList.add('expanded');
    setActiveLang(currentLang); // Убедимся, что активный класс корректно отображается
    languageSwitcher.style.cursor = 'grabbing';
  };

  const collapseSwitcher = () => {
    if (!isExpanded) return;
    isExpanded = false;
    languageSwitcher.classList.remove('expanded');
    languageSwitcher.classList.add('collapsed');
    setActiveLang(currentLang); // Убедимся, что активный класс корректно отображается
    languageSwitcher.style.cursor = 'grab';
  };

  // Инициализация: установка языка по умолчанию и свернутое состояние
  const savedLang = localStorage.getItem('userLang') || 'en';
  setActiveLang(savedLang);
  collapseSwitcher(); // Начинаем в свернутом состоянии

  // --- Логика для мыши (десктоп) ---
  languageSwitcher.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Реагируем только на левую кнопку мыши
    startX = e.clientX;
    isSwiping = false; // Сбрасываем флаг свайпа

    // Сразу расширяем при mousedown, если переключатель свернут
    if (!isExpanded) {
      expandSwitcher();
    }
    languageSwitcher.style.cursor = 'grabbing'; // Меняем курсор на "grabbing"
  });

  languageSwitcher.addEventListener('mousemove', (e) => {
    if (startX === null) return;
    const diffX = Math.abs(e.clientX - startX);
    if (diffX > DRAG_START_THRESHOLD) { // Если сдвинулись больше порога
      isSwiping = true;
    }
  });

  languageSwitcher.addEventListener('mouseup', (e) => {
    if (startX === null) return;
    languageSwitcher.style.cursor = 'grab'; // Возвращаем обычный курсор
    
    const endX = e.clientX;
    const diffX = endX - startX;
    const swipeThreshold = 30; // Минимальное расстояние для срабатывания свайпа

    if (isSwiping && Math.abs(diffX) > swipeThreshold) { // Был свайп
      let currentIndex = langs.indexOf(currentLang);
      if (diffX < 0) { // Свайп влево
          currentIndex = (currentIndex + 1) % langs.length;
      } else { // Свайп вправо
          currentIndex = (currentIndex - 1 + langs.length) % langs.length;
      }
      setActiveLang(langs[currentIndex]);
      // После свайпа переключатель остается развернутым для продолжения выбора
    } else { // Был простой тап (без значительного свайпа)
      // Если переключатель развернут (после начального mousedown), то тап его свернет
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
    isSwiping = false; // Сбрасываем флаг свайпа

    // Сразу расширяем при touchstart, если переключатель свернут
    if (!isExpanded) {
      expandSwitcher();
    }
  }, { passive: true });

  languageSwitcher.addEventListener('touchmove', (e) => {
    if (startX === null) return;
    const diffX = Math.abs(e.touches[0].clientX - startX);
    if (diffX > DRAG_START_THRESHOLD) { // Если сдвинулись больше порога
      isSwiping = true;
    }
  }, { passive: true });

  languageSwitcher.addEventListener('touchend', (e) => {
    if (startX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    const swipeThreshold = 30; // Минимальное расстояние для срабатывания свайпа

    if (isSwiping && Math.abs(diffX) > swipeThreshold) { // Был свайп
      let currentIndex = langs.indexOf(currentLang);
      if (diffX < 0) { // Свайп влево
          currentIndex = (currentIndex + 1) % langs.length;
      } else { // Свайп вправо
          currentIndex = (currentIndex - 1 + langs.length) % langs.length;
      }
      setActiveLang(langs[currentIndex]);
      // После свайпа переключатель остается развернутым
    } else { // Был простой тап (без значительного свайпа)
      // Если переключатель развернут (после начального touchstart), то тап его свернет
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
      if (isExpanded) { // Реагируем на клик только если переключатель развернут
        e.stopPropagation(); // Предотвращаем всплытие события
        setActiveLang(opt.dataset.lang);
        collapseSwitcher(); // Сворачиваем после выбора
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
