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
                    <p>Card Number: <b>XXXX XXXX XXXX XXXX</b></p>
                    <p>Full Name: <b>Ivan Petrov</b></p>
                    <p>Purpose of payment: <b>Donation</b></p>
                `,
                copyButtonText: 'Copy card number',
                copyButtonData: 'XXXX XXXX XXXX XXXX',
                note: 'Please use these details for transfer.'
            },
            ru: {
                title: 'ПриватБанк',
                contentHtml: `
                    <p>Номер карты: <b>XXXX XXXX XXXX XXXX</b></p>
                    <p>ФИО: <b>Иван Петров</b></p>
                    <p>Назначение платежа: <b>Донат</b></p>
                `,
                copyButtonText: 'Копировать номер карты',
                copyButtonData: 'XXXX XXXX XXXX XXXX',
                note: 'Пожалуйста, используйте эти реквизиты для перевода.'
            },
            ua: {
                title: 'ПриватБанк',
                contentHtml: `
                    <p>Номер картки: <b>XXXX XXXX XXXX XXXX</b></p>
                    <p>ПІБ: <b>Іван Петров</b></p>
                    <p>Призначення платежу: <b>Донат</b></p>
                `,
                copyButtonText: 'Копіювати номер картки',
                copyButtonData: 'XXXX XXXX XXXX XXXX',
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
                copyButtonText: 'Copy card number',
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
                copyButtonText: 'Копировать номер карты',
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
                copyButtonText: 'Копіювати номер картки',
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
                copyButtonText: '', // No copy button for PayPal email in this setup
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
                copyButtonText: '',
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
                copyButtonText: '',
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
                copyButtonText: 'Copy wallet address',
                copyButtonData: 'TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789',
                note: 'Please send only USDT on TRC20 network.'
            },
            ru: {
                title: 'Binance',
                contentHtml: `
                    <p>Для доната через Binance (USDT TRC20):</p>
                    <p>Адрес кошелька: <b>TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789</b></p>
                `,
                copyButtonText: 'Копировать адрес кошелька',
                copyButtonData: 'TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789',
                note: 'Пожалуйста, отправляйте только USDT в сети TRC20.'
            },
            ua: {
                title: 'Binance',
                contentHtml: `
                    <p>Для донату через Binance (USDT TRC20):</p>
                    <p>Адреса гаманця: <b>TZ1abcdEFGHijklMNOPqrstUVWXYZ123456789</b></p>
                `,
                copyButtonText: 'Копіювати адресу гаманця',
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
                copyButtonText: 'Copy card number',
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
                copyButtonText: 'Копировать номер карты',
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
                copyButtonText: 'Копіювати номер картки',
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
                copyButtonText: '', // No copy button for Telegram nick in this setup
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
                copyButtonText: '',
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
                copyButtonText: '',
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
        // Находим место для вставки контента, перед кнопкой копирования и заметкой
        const existingCopyButton = modalContentEl.querySelector('.copy-button');
        const existingNote = modalContentEl.querySelector('.modal-note');
        
        // Временно удаляем существующие элементы контента, кроме заголовка, кнопки закрытия, кнопки копирования и заметки
        Array.from(modalContentEl.children).forEach(child => {
            if (child.tagName !== 'SPAN' && child.tagName !== 'H2' && 
                child !== existingCopyButton && child !== existingNote) {
                child.remove();
            }
        });

        // Вставляем новый контент перед кнопкой копирования (если она есть) или перед заметкой
        if (existingCopyButton) {
            existingCopyButton.insertAdjacentHTML('beforebegin', data.contentHtml);
        } else if (existingNote) {
            existingNote.insertAdjacentHTML('beforebegin', data.contentHtml);
        } else {
             // Если нет ни кнопки, ни заметки, просто добавляем в конец
            modalContentEl.insertAdjacentHTML('beforeend', data.contentHtml);
        }


        // Обновляем кнопку "Копировать"
        if (data.copyButtonText) {
            if (!existingCopyButton) { // Если кнопки не было, но она нужна
                const newCopyButton = document.createElement('button');
                newCopyButton.classList.add('copy-button');
                newCopyButton.setAttribute('data-copy-text', data.copyButtonData);
                newCopyButton.textContent = data.copyButtonText;
                // Добавляем обработчик события для новой кнопки
                newCopyButton.addEventListener('click', async () => {
                    const textToCopy = newCopyButton.dataset.copyText;
                    try {
                        await navigator.clipboard.writeText(textToCopy);
                        const originalText = newCopyButton.textContent;
                        newCopyButton.textContent = 'Скопировано!'; // This should also be translated
                        setTimeout(() => {
                            newCopyButton.textContent = originalText;
                        }, 1500);
                    } catch (err) {
                        console.error('Не удалось скопировать текст: ', err);
                        alert('Не удалось скопировать текст. Пожалуйста, скопируйте вручную: ' + textToCopy);
                    }
                });
                modalContentEl.appendChild(newCopyButton); // Добавляем в конец, или можно вставить перед заметкой
            } else { // Если кнопка уже есть, обновляем ее
                existingCopyButton.textContent = data.copyButtonText;
                existingCopyButton.setAttribute('data-copy-text', data.copyButtonData);
                existingCopyButton.style.display = 'block'; // Показываем
            }
        } else {
            if (existingCopyButton) { // Если кнопка есть, но она не нужна
                existingCopyButton.style.display = 'none'; // Скрываем
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

    // Для копирования текста в буфер обмена - эту часть мы перенесем в translateModalContent
    // чтобы она применялась к динамически создаваемым/обновляемым кнопкам.
    // Код для кнопок копирования:
    // Мы будем навешивать обработчик прямо в translateModalContent при создании/обновлении кнопки.

    // Выставляем функцию перевода в глобальную область видимости, чтобы script.js мог ее вызвать
    window.translateActiveModal = (lang) => {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            translateModalContent(activeModal, lang);
        }
    };
});

