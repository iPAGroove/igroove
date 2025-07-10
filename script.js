document.addEventListener('DOMContentLoaded', () => {
  const languageSwitcher = document.getElementById('language-switcher');
  const langOptions = document.querySelectorAll('.lang-option');

  const langs = ['en', 'ru', 'ua'];
  let currentLang = 'en';

  // Функция для установки активного языка
  const setActiveLang = (lang) => {
    currentLang = lang;
    langOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    console.log(`Language set to: ${lang}`);
    localStorage.setItem('userLang', lang); // Сохраняем предпочтение

    // Если модальное окно активно, обновляем его контент на новый язык
    if (window.translateActiveModal) { // Проверяем, что функция из modal.js доступна
        window.translateActiveModal(currentLang);
    }
  };

  // Инициализация: установка языка по умолчанию
  const savedLang = localStorage.getItem('userLang') || 'en';
  setActiveLang(savedLang);

  // Обработка кликов непосредственно по опциям языка
  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation(); // Предотвращаем всплытие события, хотя это уже не так критично
      setActiveLang(opt.dataset.lang);
    });
  });

  // Логика свайпов и расширения/сворачивания удалена,
  // так как переключатель языка всегда открыт и работает по клику.
});
