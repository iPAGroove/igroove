document.addEventListener('DOMContentLoaded', () => {
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-button');
    const modalOverlay = document.getElementById('modal-overlay');

    // Объект с переводами для каждого модального окна
    const modalTranslations = {
        'privatbank-modal': {
            en: {
                title: 'PrivatBank',
                contentHtml: `
                    <p>Card Number: <b>4149 4990 9605 8944</b></p>
                    <p>Full Name: <b>Vadym Frolov</b></p>
                    <p>Purpose of payment: <b>Donation</b></p>
                `,
                buttonText: 'Pay', // Changed to generic buttonText
                payButtonUrl: 'https://www.privat24.ua/send/hm8gg', // New field for URL
                note: 'Please use these details for transfer.'
            },
            ru: {
                title: 'ПриватБанк',
                contentHtml: `
                    <p>Номер карты: <b>4149 4990 9605 8944</b></p>
                    <p>ФИО: <b>Фролов Вадим</b></p>
                    <p>Назначение платежа: <b>Донат</b></p>
                `,
                buttonText: 'Оплатить', // Changed
                payButtonUrl: 'https://www.privat24.ua/send/hm8gg', // New field for URL
                note: 'Пожалуйста, используйте эти реквизиты для перевода.'
            },
            ua: {
                title: 'ПриватБанк',
                contentHtml: `
                    <p>Номер картки: <b>4149 4990 9605 8944</b></p>
                    <p>ПІБ: <b>Фролов Вадим</b></p>
                    <p>Призначення платежу: <b>Донат</b></p>
                `,
                buttonText: 'Сплатити', // Changed
                payButtonUrl: 'https://www.privat24.ua/send/hm8gg', // New field for URL
                note: 'Будь ласка, використовуйте ці реквізити для переказу.'
            }
        },
        'monobank-modal': {
            en: {
                title: 'Monobank',
                contentHtml: `
                    <p>Card Number: <b>YYYY YYYY YYYY YYYY</b></p>
                    <p>Full Name: <b>Maria Ivanova</b></p>
                    <p>Purpose of payment: <b>Support</b></p>
                `,
                buttonText: 'Copy card number',
                copyButtonData: 'YYYY YYYY YYYY YYYY',
                note: 'Your support is very important to us!'
            },
            ru: {
                title: 'Монобанк',
                contentHtml: `
                    <p>Номер карты: <b>YYYY YYYY YYYY YYYY</b></p>
                    <p>ФИО: <b>Мария Иванова</b></p>
                    <p>Назначение платежа: <b>Поддержка</b></p>
                `,
                buttonText: 'Копировать номер карты',
                copyButtonData: 'YYYY YYYY YYYY YYYY',
                note: 'Ваша поддержка очень важна для нас!'
            },
            ua: {
                title: 'Монобанк',
                contentHtml: `
                    <p>Номер картки: <b>YYYY YYYY YYYY YYYY</b></p>
                    <p>ПІБ: <b>Марія Іванова</b></p>
                    <p>Призначення платежу: <b>Підтримка</b></p>
                `,
                buttonText: 'Копіювати номер картки',
                copyButtonData: 'YYYY YYYY YYYY YYYY',
                note: 'Ваша підтримка дуже важлива для нас!'
            }
        },
        'paypal-modal': {
            en: {
                title: 'PayPal',
                contentHtml: `
                    <p>For donations via PayPal:</p>
                    <p>Email: <b>your_paypal_email@example.com</b></p>
                    <a href="https://www.paypal.me/yourusername" target="_blank" class="modal-link">Go to PayPal.Me page</a>
                `,
                buttonText: '', // No button for PayPal email in this setup
                copyButtonData: '',
                note: 'Please send funds as "Friend or Family" to avoid fees.'
            },
            ru: {
                title: 'PayPal',
                contentHtml: `
                    <p>Для доната через PayPal:</p>
                    <p>Email: <b>your_paypal_email@example.com</b></p>
                    <a href="https://www.paypal.me/yourusername" target="_blank" class="modal-link">Перейти на страницу PayPal.Me</a>
                `,
                buttonText: '',
                copyButtonData: '',
                note: 'Пожалуйста, отправляйте средства как "Другу или семье", чтобы избежать комиссий.'
            },
            ua: {
                title: 'PayPal',
                contentHtml: `
                    <p>Для донату через PayPal:</p>
                    <p>Email: <b>your_paypal_email@example.com</b></p>
                    <a href="https://www.paypal.me/yourusername" target="_blank" class="modal-link">Перейти на сторінку PayPal.Me</a>
                `,
                buttonText: '',
                copyButtonData: '',
                note: 'Будь ласка, надсилайте кошти як "Другу або родині", щоб уникнути комісій.'
            }
        },
        'binance-modal': {
            en: {
                title: 'Binance',
                contentHtml: `
                    <p>For donations via Binance (USDT TRC20):</p>
                    <p>Wallet Address: <b>TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789</b></p>
                `,
                buttonText: 'Copy wallet address',
                copyButtonData: 'TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789',
                note: 'Please send only USDT on TRC20 network.'
            },
            ru: {
                title: 'Binance',
                contentHtml: `
                    <p>Для доната через Binance (USDT TRC20):</p>
                    <p>Адрес кошелька: <b>TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789</b></p>
                `,
                buttonText: 'Копировать адрес кошелька',
                copyButtonData: 'TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789',
                note: 'Пожалуйста, отправляйте только USDT в сети TRC20.'
            },
            ua: {
                title: 'Binance',
                contentHtml: `
                    <p>Для донату через Binance (USDT TRC20):</p>
                    <p>Адреса гаманця: <b>TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789</b></p>
                `,
                buttonText: 'Копіювати адресу гаманця',
                copyButtonData: 'TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789',
                note: 'Будь ласка, надсилайте тільки USDT у мережі TRC20.'
            }
        },
        'abank-modal': {
            en: {
                title: 'ABank',
                contentHtml: `
                    <p>ABank Information:</p>
                    <p>Card Number: <b>AAAA AAAA AAAA AAAA</b></p>
                    <p>Full Name: <b>Alex Kuznetsov</b></p>
                `,
                buttonText: 'Copy card number',
                copyButtonData: 'AAAA AAAA AAAA AAAA',
                note: 'Thank you for your contribution!'
            },
            ru: {
                title: 'ABank',
                contentHtml: `
                    <p>Информация об ABank:</p>
                    <p>Номер карты: <b>AAAA AAAA AAAA AAAA</b></p>
                    <p>ФИО: <b>Алексей Кузнецов</b></p>
                `,
                buttonText: 'Копировать номер карты',
                copyButtonData: 'AAAA AAAA AAAA AAAA',
                note: 'Спасибо за ваш вклад!'
            },
            ua: {
                title: 'ABank',
                contentHtml: `
                    <p>Інформація про ABank:</p>
                    <p>Номер картки: <b>AAAA AAAA AAAA AAAA</b></p>
                    <p>ПІБ: <b>Олексій Кузнецов</b></p>
                `,
                buttonText: 'Копіювати номер картки',
                copyButtonData: 'AAAA AAAA AAAA AAAA',
                note: 'Дякуємо за ваш внесок!'
            }
        },
        'telegram-modal': {
            en: {
                title: 'Telegram Wallet',
                contentHtml: `
                    <p>For donations via Telegram Wallet:</p>
                    <p>Our Telegram Nick: <b>@your_telegram_username</b></p>
                    <a href="https://t.me/your_telegram_username" target="_blank" class="modal-link">Go to Telegram chat</a>
                `,
                buttonText: '', // No button for Telegram nick in this setup
                copyButtonData: '',
                note: 'You can send TON or other cryptocurrency via Telegram Wallet.'
            },
            ru: {
                title: 'Telegram Wallet',
                contentHtml: `
                    <p>Для доната через Telegram Wallet:</p>
                    <p>Наш ник в Telegram: <b>@your_telegram_username</b></p>
                    <a href="https://t.me/your_telegram_username" target="_blank" class="modal-link">Перейти в Telegram чат</a>
                `,
                buttonText: '',
                copyButtonData: '',
                note: 'Вы можете отправить TON или другую криптовалюту через Telegram Wallet.'
            },
            ua: {
                title: 'Telegram Wallet',
                contentHtml: `
                    <p>Для донату через Telegram Wallet:</p>
                    <p>Наш нік у Telegram: <b>@your_telegram_username</b></p>
                    <a href="https://t.me/your_telegram_username" target="_blank" class="modal-link">Перейти в Telegram чат</a>
                `,
                buttonText: '',
                copyButtonData: '',
                note: 'Ви можете надіслати TON або іншу криптовалюту через Telegram Wallet.'
            }
        }
    };

    // Функция для обновления контента модального окна на выбранном языке
    const translateModalContent = (modalElement, lang) => {
        const modalId = modalElement.id;
        const translations = modalTranslations[modalId];

        if (!translations || !translations[lang]) {
            console.warn(`No translations found for modal ${modalId} in language ${lang}`);
            return;
        }

        const data = translations[lang];
        const modalContentEl = modalElement.querySelector('.modal-content');

        // Обновляем заголовок
        modalContentEl.querySelector('h2').textContent = data.title;

        // Обновляем основной HTML-контент
        // Находим место для вставки контента, перед кнопкой и заметкой
        let existingButton = modalContentEl.querySelector('.modal-button'); // Унифицированный селектор
        const existingNote = modalContentEl.querySelector('.modal-note');
        
        // Временно удаляем существующие элементы контента, кроме заголовка, кнопки закрытия, кнопки и заметки
        Array.from(modalContentEl.children).forEach(child => {
            if (child.tagName !== 'SPAN' && child.tagName !== 'H2' && 
                child !== existingButton && child !== existingNote) {
                child.remove();
            }
        });

        // Вставляем новый контент перед кнопкой (если она есть) или перед заметкой
        if (existingButton) {
            existingButton.insertAdjacentHTML('beforebegin', data.contentHtml);
        } else if (existingNote) {
            existingNote.insertAdjacentHTML('beforebegin', data.contentHtml);
        } else {
             // Если нет ни кнопки, ни заметки, просто добавляем в конец
            modalContentEl.insertAdjacentHTML('beforeend', data.contentHtml);
        }

        // Обновляем кнопку
        if (data.buttonText) {
            if (!existingButton) { // Если кнопки не было, но она нужна
                existingButton = document.createElement('button'); // Создаем новую кнопку
                existingButton.classList.add('modal-button'); // Используем общий класс
                modalContentEl.appendChild(existingButton);
            }
            existingButton.textContent = data.buttonText;
            existingButton.style.display = 'block'; // Показываем

            // Удаляем старые обработчики событий, чтобы избежать дублирования
            const oldButton = existingButton.cloneNode(true); // Клонируем, чтобы удалить старые обработчики
            existingButton.parentNode.replaceChild(oldButton, existingButton);
            existingButton = oldButton; // Обновляем ссылку на новую кнопку
            
            // Добавляем новый обработчик события
            if (data.payButtonUrl) {
                existingButton.removeEventListener('click', handleCopyClick); // Удаляем старый обработчик копирования
                existingButton.addEventListener('click', () => {
                    window.open(data.payButtonUrl, '_blank');
                });
            } else if (data.copyButtonData) {
                existingButton.removeEventListener('click', handlePayClick); // Удаляем старый обработчик оплаты
                existingButton.addEventListener('click', async () => {
                    const textToCopy = data.copyButtonData;
                    try {
                        await navigator.clipboard.writeText(textToCopy);
                        const originalText = existingButton.textContent;
                        existingButton.textContent = translations[lang].buttonText === 'Копировать номер карты' ? 'Скопировано!' : 'Copied!'; // Simplified to use translated 'Copied!'
                        setTimeout(() => {
                            existingButton.textContent = originalText;
                        }, 1500);
                    } catch (err) {
                        console.error('Failed to copy text: ', err);
                        alert('Failed to copy text. Please copy manually: ' + textToCopy);
                    }
                });
            }

        } else {
            if (existingButton) { // Если кнопка есть, но она не нужна
                existingButton.style.display = 'none'; // Скрываем
            }
        }
        
        // Обновляем заметку
        if (data.note) {
            if (!existingNote) {
                const newNote = document.createElement('p');
                newNote.classList.add('modal-note');
                newNote.textContent = data.note;
                modalContentEl.appendChild(newNote);
            } else {
                existingNote.textContent = data.note;
                existingNote.style.display = 'block';
            }
        } else {
            if (existingNote) {
                existingNote.style.display = 'none';
            }
        }
    };

    // Dummy functions to be removed from event listeners
    const handleCopyClick = () => {};
    const handlePayClick = () => {};


    // Функция открытия модального окна
    const openModal = (modalId) => {
        const modal = document.querySelector(modalId);
        if (modal) {
            // Перед открытием переводим контент модального окна на текущий язык
            const currentLang = localStorage.getItem('userLang') || 'en'; // Получаем текущий язык
            translateModalContent(modal, currentLang);

            modal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
        }
    };

    // Функция закрытия модального окна
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Включаем прокрутку страницы обратно
        }
    };

    // Открытие модального окна при клике на иконку
    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Отменяем стандартное действие ссылки (переход)
            const modalId = button.dataset.modalTarget;
            openModal(modalId);
        });
    });

    // Закрытие модального окна при клике на кнопку закрытия
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal'); // Находим ближайшее родительское модальное окно
            closeModal(modal);
        });
    });

    // Закрытие модального окна при клике на оверлей
    modalOverlay.addEventListener('click', () => {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal);
        }
    });

    // Закрытие модального окна по нажатию клавиши ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // Выставляем функцию перевода в глобальную область видимости, чтобы script.js мог ее вызвать
    window.translateActiveModal = (lang) => {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            translateModalContent(activeModal, lang);
        }
    };
});
