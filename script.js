document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const currentLangDisplay = document.getElementById('current-lang-display');
    const langOptionsExpanded = document.getElementById('lang-options-expanded');
    const langOptionItems = langOptionsExpanded.querySelectorAll('.lang-option-item');

    const langs = ['en', 'ru', 'ua']; // Порядок языков
    let currentLang = 'en'; // Язык по умолчанию
    let isExpanded = false; // Отслеживает состояние: свернуто/развернуто
    let startX = null;
    let isSwiping = false; // Флаг для различения свайпа от простого клика/удержания
    let longPressTimer;
    const LONG_PRESS_THRESHOLD = 300; // Порог в мс для определения "долгого нажатия"

    // Функция установки активного языка и обновления отображения
    const setActiveLang = (lang) => {
        currentLang = lang;
        currentLangDisplay.textContent = lang.toUpperCase();
        currentLangDisplay.dataset.lang = lang;

        // Обновляем класс 'active' для элементов в развернутом списке
        langOptionItems.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });
        console.log(`Language set to: ${lang}`);
        localStorage.setItem('userLang', lang); // Сохраняем предпочтение
    };

    // Функция для переключения состояния (свернуто/развернуто)
    const toggleExpandedState = (expand) => {
        isExpanded = expand;
        if (isExpanded) {
            languageSwitcher.classList.add('expanded');
            // Убеждаемся, что активный элемент визуально правилен при разворачивании
            langOptionItems.forEach(opt => {
                opt.classList.toggle('active', opt.dataset.lang === currentLang);
            });
        } else {
            languageSwitcher.classList.remove('expanded');
        }
    };

    // Инициализация: установка языка по умолчанию и свернутое состояние
    const savedLang = localStorage.getItem('userLang') || 'en';
    setActiveLang(savedLang); // Устанавливаем начальный язык (из сохраненных или по умолчанию)
    toggleExpandedState(false); // Начинаем в свернутом состоянии

    // --- Логика нажатия/удержания для расширения/сворачивания ---
    languageSwitcher.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Реагируем только на левую кнопку мыши
        startX = e.clientX;
        isSwiping = false; // Сбрасываем флаг свайпа

        longPressTimer = setTimeout(() => {
            toggleExpandedState(true); // Разворачиваем при долгом удержании
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
            if (isExpanded) { // Если уже развернуто удержанием, теперь это свайп
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
                 toggleExpandedState(!isExpanded); // Переключаем состояние (развернуть/свернуть)
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
                toggleExpandedState(false); 
            } else if (isExpanded && Math.abs(diffX) <= swipeThreshold && !isSwiping) {
                // Если было развернуто долгим нажатием и не было свайпа, считаем как тап для сворачивания
                toggleExpandedState(false);
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
            toggleExpandedState(true); // Разворачиваем при долгом удержании
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
                 toggleExpandedState(!isExpanded); // Переключаем состояние (развернуть/свернуть)
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
                toggleExpandedState(false); // Свернуть после выбора свайпом
            } else if (isExpanded && Math.abs(diffX) <= swipeThreshold && !isSwiping) {
                 // Если было развернуто долгим нажатием и не было свайпа, считаем как тап для сворачивания
                toggleExpandedState(false);
            }
        }
        startX = null;
        isSwiping = false;
    }, { passive: true });

    // Обработка кликов непосредственно по опциям языка при развернутом состоянии
    langOptionItems.forEach(opt => {
        opt.addEventListener('click', (e) => {
            // Предотвращаем всплытие события, чтобы не срабатывала логика клика по languageSwitcher
            e.stopPropagation(); 
            setActiveLang(opt.dataset.lang);
            toggleExpandedState(false); // Сворачиваем после выбора
        });
    });

    // Сворачивать при клике за пределами переключателя (для лучшего UX)
    document.addEventListener('click', (e) => {
        if (isExpanded && !languageSwitcher.contains(e.target)) {
            toggleExpandedState(false);
        }
    });
});
