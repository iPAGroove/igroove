document.addEventListener('DOMContentLoaded', () => {
  const languageSwitcher = document.getElementById('language-switcher');
  const langOptions = document.querySelectorAll('.lang-option'); // Теперь это все div.lang-option

  const langs = ['en', 'ru', 'ua'];
  let currentLang = 'en';
  let isExpanded = false;
  let startX = null;
  let isSwiping = false;
  let longPressTimer;
  const LONG_PRESS_THRESHOLD = 300; // мс для определения "долгого нажатия"

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
    if (isExpanded) return; // Если уже развернут, ничего не делаем
    isExpanded = true;
    languageSwitcher.classList.remove('collapsed');
    languageSwitcher.classList.add('expanded');
    // Убедимся, что активный класс корректно отображается
    setActiveLang(currentLang); 
    languageSwitcher.style.cursor = 'grab'; // Курсор при развернутом
  };

  const collapseSwitcher = () => {
    if (!isExpanded) return; // Если уже свернут, ничего не делаем
    isExpanded = false;
    languageSwitcher.classList.remove('expanded');
    languageSwitcher.classList.add('collapsed');
    // Убедимся, что активный класс корректно отображается
    setActiveLang(currentLang);
    languageSwitcher.style.cursor = 'pointer'; // Курсор при свернутом
  };

  // Инициализация: установка языка по умолчанию и свернутое состояние
  const savedLang = localStorage.getItem('userLang') || 'en';
  setActiveLang(savedLang);
  collapseSwitcher(); // Начинаем в свернутом состоянии

  // --- Логика нажатия/удержания для расширения/сворачивания ---
  languageSwitcher.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Реагируем только на левую кнопку мыши
    startX = e.clientX;
    isSwiping = false; // Сбрасываем флаг свайпа

    longPressTimer = setTimeout(() => {
        expandSwitcher(); // Разворачиваем при долгом удержании
        languageSwitcher.style.cursor = 'grabbing'; // Меняем курсор
        isSwiping = false; // Подтверждаем, что это было удержание, а не свайп
    }, LONG_PRESS_THRESHOLD);
  });

  languageSwitcher.addEventListener('mousemove', (e) => {
    if (startX === null || !longPressTimer) return;
    const diffX = Math.abs(e.clientX - startX);
    if (diffX > 10) { // Если мышь сдвинулась более чем на 10px, это, вероятно, не просто таб/удержание
        clearTimeout(longPressTimer);
        longPressTimer = null;
        if (isExpanded) { // Если уже развернуто удержанием, теперь это может быть свайп
             isSwiping = true;
             languageSwitcher.style.cursor = 'grabbing';
        }
    }
  });

  languageSwitcher.addEventListener('mouseup', (e) => {
    if (startX === null) return;
    languageSwitcher.style.cursor = 'grab'; // Возвращаем обычный курсор
    
    const endX = e.clientX;
    const diffX = endX - startX;
    const swipeThreshold = 30; // Минимальное расстояние для срабатывания свайпа

    if (longPressTimer) { // Был короткий клик/нажатие (таймер не сработал)
        clearTimeout(longPressTimer);
        longPressTimer = null;
        if (!isSwiping) { // Если не было значительного перетаскивания
             if (isExpanded) {
                 collapseSwitcher(); // Если развернут, свернуть
             } else {
                 expandSwitcher(); // Если свернут, развернуть
             }
        }
    } else { // Таймер уже сработал (было долгое нажатие) или был отменен движением
        if (isExpanded && Math.abs(diffX) > swipeThreshold) { // Был свайп после разворачивания
            let currentIndex = langs.indexOf(currentLang);
            if (diffX < 0) { // Свайп влево
                currentIndex = (currentIndex + 1) % langs.length;
            } else { // Свайп вправо
                currentIndex = (currentIndex - 1 + langs.length) % langs.length;
            }
            setActiveLang(langs[currentIndex]);
            // Опционально: свернуть после выбора свайпом
            // collapseSwitcher(); 
        } else if (isExpanded && Math.abs(diffX) <= swipeThreshold && !isSwiping) {
            // Если было развернуто долгим нажатием и не было свайпа, считаем как тап для сворачивания
            collapseSwitcher();
        }
    }
    startX = null;
    isSwiping = false;
  });

  // --- Сенсорные события для мобильных устройств ---
  languageSwitcher.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = false; // Сбрасываем флаг свайпа

    longPressTimer = setTimeout(() => {
        expandSwitcher(); // Разворачиваем при долгом удержании
        isSwiping = false; // Подтверждаем, что это было удержание
    }, LONG_PRESS_THRESHOLD);
  }, { passive: true }); // passive: true для улучшения производительности прокрутки

  languageSwitcher.addEventListener('touchmove', (e) => {
    if (startX === null || !longPressTimer) return;
    const diffX = Math.abs(e.touches[0].clientX - startX);
    if (diffX > 10) { // Если палец сдвинулся более чем на 10px
        clearTimeout(longPressTimer);
        longPressTimer = null;
        if (isExpanded) {
            isSwiping = true;
        }
    }
  }, { passive: true });

  languageSwitcher.addEventListener('touchend', (e) => {
    if (startX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    const swipeThreshold = 30; // Минимальное расстояние для срабатывания свайпа

    if (longPressTimer) { // Был короткий клик/нажатие (таймер не сработал)
        clearTimeout(longPressTimer);
        longPressTimer = null;
        if (!isSwiping) { // Если не было значительного перетаскивания
             if (isExpanded) {
                 collapseSwitcher(); // Если развернут, свернуть
             } else {
                 expandSwitcher(); // Если свернут, развернуть
             }
        }
    } else { // Таймер уже сработал (было долгое нажатие) или был отменен движением
        if (isExpanded && Math.abs(diffX) > swipeThreshold) { // Был свайп после разворачивания
            let currentIndex = langs.indexOf(currentLang);
            if (diffX < 0) { // Свайп влево
                currentIndex = (currentIndex + 1) % langs.length;
            } else { // Свайп вправо
                currentIndex = (currentIndex - 1 + langs.length) % langs.length;
            }
            setActiveLang(langs[currentIndex]);
            // Опционально: свернуть после выбора свайпом
            // collapseSwitcher(); 
        } else if (isExpanded && Math.abs(diffX) <= swipeThreshold && !isSwiping) {
            // Если было развернуто долгим нажатием и не было свайпа, считаем как тап для сворачивания
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
