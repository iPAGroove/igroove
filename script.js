document.addEventListener('DOMContentLoaded', () => {
  const languageSwitcher = document.getElementById('language-switcher'); // Основной контейнер для свайпа
  const currentLangDisplay = document.getElementById('current-lang-display'); // Элемент для отображения текущего языка
  
  // Определяем порядок языков для переключения
  const langs = ['en', 'ru', 'ua'];
  let currentLang = 'en'; // Язык по умолчанию, как запрошено

  // Функция для установки активного языка и обновления отображения
  const setActiveLang = (lang) => {
    currentLang = lang;
    currentLangDisplay.textContent = lang.toUpperCase(); // Обновляем текст
    currentLangDisplay.dataset.lang = lang; // Обновляем data-lang атрибут
    console.log(`Language set to: ${lang}`);
    // Опционально, можно сохранить предпочтения языка в localStorage
    // localStorage.setItem('userLang', lang); 
  };

  // --- Логика свайпа/перетаскивания ---
  let startX = null;
  
  // События мыши для десктопов
  languageSwitcher.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    languageSwitcher.style.cursor = 'grabbing'; // Меняем курсор, показывая возможность перетаскивания
  });

  languageSwitcher.addEventListener('mouseup', (e) => {
    if (startX === null) return;
    languageSwitcher.style.cursor = 'grab'; // Возвращаем обычный курсор

    const endX = e.clientX;
    const diff = endX - startX;
    const threshold = 30; // Минимальное расстояние в пикселях для срабатывания свайпа

    if (Math.abs(diff) > threshold) {
      let currentIndex = langs.indexOf(currentLang);
      if (diff < 0) { // Свайп влево
        currentIndex = (currentIndex + 1) % langs.length;
      } else { // Свайп вправо
        currentIndex = (currentIndex - 1 + langs.length) % langs.length;
      }
      setActiveLang(langs[currentIndex]);
    }
    startX = null;
  });

  // Предотвращаем выделение текста во время перетаскивания на десктопе
  languageSwitcher.addEventListener('mousemove', (e) => {
    if (startX !== null) {
      e.preventDefault();
    }
  });

  // Сенсорные события для мобильных устройств
  languageSwitcher.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true }); // Используем passive для улучшения производительности прокрутки

  languageSwitcher.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const threshold = 30; // Минимальное расстояние в пикселях для срабатывания свайпа

    if (Math.abs(diff) > threshold) {
      let currentIndex = langs.indexOf(currentLang);
      if (diff < 0) { // Свайп влево
        currentIndex = (currentIndex + 1) % langs.length;
      } else { // Свайп вправо
        currentIndex = (currentIndex - 1 + langs.length) % langs.length;
      }
      setActiveLang(langs[currentIndex]);
    }
    startX = null;
  }, { passive: true }); // Используем passive для улучшения производительности прокрутки

  // Устанавливаем начальный язык при загрузке страницы
  // Опционально: можно использовать localStorage, чтобы загрузить ранее выбранный язык
  // const savedLang = localStorage.getItem('userLang') || 'en';
  setActiveLang('en'); // Устанавливаем 'en' как язык по умолчанию
});
