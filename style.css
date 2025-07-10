/* Добавил CSS переменные для удобства */
:root {
    /* Обновленные переменные для текста - теперь голубовато-синие */
    --text-color: #ffffff; /* Основной белый цвет для четкости */
    --text-glow-color-light: rgba(255, 255, 255, 0.5); /* Легкое белое свечение */
    --text-glow-color-accent: rgba(135, 206, 250, 0.8); /* Светло-голубой акцент */
    --text-gradient-start: #ffffff; /* Начало градиента: белый */
    --text-gradient-middle: #ADD8E6; /* Середина градиента: Светло-голубой */
    --text-gradient-end: #87CEEB; /* Конец градиента: Голубой */

    --container-bg: rgba(255, 255, 255, 0.08);
    --box-shadow-color: rgba(0, 0, 0, 0.3);
    --icon-hover-scale: 1.15;
    --icon-shadow-color: rgba(0, 0, 0, 0.4);
    
    /* Скроллбар тоже сделаем в тон, голубоватым */
    --scrollbar-track-color: rgba(255, 255, 255, 0.05);
    --scrollbar-thumb-color: rgba(135, 206, 250, 0.6); /* Полупрозрачный светло-голубой для ползунка */
    --scrollbar-thumb-hover-color: rgba(135, 206, 250, 0.9); /* Более яркий светло-голубой при наведении */

    /* Переменные для переключателя языка */
    --lang-switcher-bg: rgba(255, 255, 255, 0.1);
    --lang-switcher-border-color: rgba(255, 255, 255, 0.2);
    --lang-switcher-text-color: #ffffff;
    --lang-switcher-active-color: #87CEEB; /* Голубой для активного */
    --lang-switcher-inactive-color: rgba(255, 255, 255, 0.6); /* Чуть тусклее для неактивных */
    --lang-selector-indicator-color: #87CEEB; /* Цвет ползунка */

    --lang-switcher-font-size: 18px; /* Увеличенный размер шрифта */
    --lang-switcher-padding-x: 20px; /* Отступы по горизонтали */
    --lang-switcher-padding-y: 12px; /* Отступы по вертикали */
    --lang-switcher-border-radius: 20px; /* Более скругленные края */
    --lang-switcher-gap: 25px; /* Увеличенный зазор между языками */
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    background: url('https://github.com/iPAGroove/igroove/blob/main/images/IMG_6677.jpeg?raw=true') no-repeat center center fixed;
    background-size: cover;
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: hidden;
}

.donate-container {
    background: var(--container-bg);
    border-radius: 24px;
    padding: 30px;
    max-width: 600px;
    width: 100%;
    text-align: center;
    backdrop-filter: blur(18px);
    box-shadow: 0 8px 32px var(--box-shadow-color), 0 0 25px rgba(135, 206, 250, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 25px;
    color: var(--text-color);
    background: linear-gradient(90deg, var(--text-gradient-start), var(--text-gradient-middle), var(--text-gradient-end), var(--text-gradient-middle), var(--text-gradient-start));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: textGradientFlow 6s linear infinite;
    text-shadow: 
        0 0 5px var(--text-glow-color-light),
        0 0 10px var(--text-glow-color-accent),
        0 0 15px var(--text-glow-color-accent);
}

@keyframes textGradientFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}

.icon-row {
    display: flex;
    overflow-x: auto;
    gap: 24px;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
    scroll-behavior: smooth;
}

.icon-row::-webkit-scrollbar {
    height: 6px;
    background-color: var(--scrollbar-track-color);
    border-radius: 3px;
}

.icon-row::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color);
    border-radius: 3px;
    transition: background-color 0.3s ease;
}

.icon-row::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover-color);
}

.icon-item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: white;
    transition: transform 0.3s ease;
}

.icon-item:hover {
    transform: scale(var(--icon-hover-scale));
}

.icon-img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 14px;
    margin-bottom: 8px;
    box-shadow: 0 4px 10px var(--icon-shadow-color);
    background: rgba(255, 255, 255, 0.1);
}

.icon-label {
    font-size: 13px;
    text-align: center;
    max-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Language Switcher Styles */
.language-switcher {
    position: fixed;
    bottom: 30px; /* Отступ от низа */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    background: var(--lang-switcher-bg);
    border-radius: var(--lang-switcher-border-radius);
    border: 1px solid var(--lang-switcher-border-color);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Более выраженная тень */
    z-index: 1000;
    cursor: grab; /* Показывает, что элемент можно перетаскивать */
    padding: var(--lang-switcher-padding-y) var(--lang-switcher-padding-x);
    position: relative; /* Для позиционирования индикатора */
    overflow: hidden; /* Чтобы индикатор не вылезал за границы */
}

.lang-options {
    display: flex;
    gap: var(--lang-switcher-gap);
    font-size: var(--lang-switcher-font-size);
    font-weight: 500;
    color: var(--lang-switcher-inactive-color); /* Изначально неактивный цвет */
    position: relative; /* Для корректного z-index текста */
    z-index: 2; /* Убедимся, что текст поверх индикатора */
}

.lang-options span {
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0 5px; /* Небольшой padding для удобства клика */
}

.lang-options span.active {
    color: var(--lang-switcher-text-color); /* Активный язык белый */
    font-weight: 700;
}

/* Индикатор выбранного языка (ползунок) */
.lang-selector-indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 80%; /* Высота ползунка */
    background: var(--lang-selector-indicator-color);
    border-radius: var(--lang-switcher-border-radius);
    z-index: 1; /* Под текстом */
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out, opacity 0.3s ease; /* Анимация перемещения */
    opacity: 0.8; /* Полупрозрачность */
    box-shadow: 0 0 10px var(--lang-selector-indicator-color); /* Свечение ползунка */
}

/* Отключаем выделение текста для переключателя */
.language-switcher {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Медиа-запросы для адаптации */
@media (max-width: 480px) {
    .donate-container {
        padding: 20px;
        border-radius: 18px;
    }

    h1 {
        font-size: 26px;
        margin-bottom: 20px;
    }

    .icon-img {
        width: 50px;
        height: 50px;
    }

    .icon-label {
        font-size: 12px;
        max-width: 60px;
    }

    .icon-row {
        gap: 16px;
        padding-bottom: 8px;
    }
    .icon-row::-webkit-scrollbar {
        height: 4px;
    }

    .language-switcher {
        bottom: 20px; /* Чуть выше на мобильных */
        font-size: 16px;
        padding: 10px 15px;
        border-radius: 15px;
    }
    .lang-options {
        gap: 18px;
    }
}

@media (max-width: 320px) {
    h1 {
        font-size: 20px;
        margin-bottom: 18px;
    }
    .icon-img {
        width: 45px;
        height: 45px;
    }
    .icon-label {
        font-size: 11px;
        max-width: 55px;
    }
    .language-switcher {
        bottom: 15px;
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 12px;
    }
    .lang-options {
        gap: 12px;
    }
}
