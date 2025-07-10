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
                buttonText: 'Pay',
                payButtonUrl: 'https://www.privat24.ua/send/hm8gg',
                note: 'Please use these details for transfer.'
            },
            ru: {
                title: 'ПриватБанк',
                contentHtml: `
                    <p>Номер карты: <b>4149 4990 9605 8944</b></p>
                    <p>ФИО: <b>Фролов Вадим</b></p>
                    <p>Назначение платежа: <b>Донат</b></p>
                `,
                buttonText: 'Оплатить',
                payButtonUrl: 'https://www.privat24.ua/send/hm8gg',
                note: 'Пожалуйста, используйте эти реквизиты для перевода.'
            },
            ua: {
                title: 'ПриватБанк',
                contentHtml: `
                    <p>Номер картки: <b>4149 4990 9605 8944</b></p>
                    <p>ПІБ: <b>Фролов Вадим</b></p>
                    <p>Призначення платежу: <b>Донат</b></p>
                `,
                buttonText: 'Сплатити',
                payButtonUrl: 'https://www.privat24.ua/send/hm8gg',
                note: 'Будь ласка, використовуйте ці реквізити для переказу.'
            }
        },
        'monobank-modal': {
            en: {
                title: 'Monobank',
                contentHtml: `
                    <p>Card Number: <b>4441 1110 5393 7169</b></p>
                    <p>Full Name: <b>Liudmyla F.</b></p>
                    <p>Purpose of payment: <b>Support</b></p>
                `,
                buttonText: 'Copy card number',
                copyButtonData: '4441 1110 5393 7169',
                note: 'Your support is very important to us!'
            },
            ru: {
                title: 'Монобанк',
                contentHtml: `
                    <p>Номер карты: <b>4441 1110 5393 7169</b></p>
                    <p>ФИО: <b>Людмила Ф.</b></p>
                    <p>Назначение платежа: <b>Поддержка</b></p>
                `,
                buttonText: 'Копировать номер карты',
                copyButtonData: '4441 1110 5393 7169',
                note: 'Ваша поддержка очень важна для нас!'
            },
            ua: {
                title: 'Monobank',
                contentHtml: `
                    <p>Номер картки: <b>4441 1110 5393 7169</b></p>
                    <p>ПІБ: <b>Людмила Ф.</b></p>
                    <p>Призначення платежу: <b>Підтримка</b></p>
                `,
                buttonText: 'Копіювати номер картки',
                copyButtonData: '4441 1110 5393 7169',
                note: 'Ваша підтримка дуже важлива для нас!'
            }
        },
        'paypal-modal': {
            en: {
                title: 'PayPal',
                contentHtml: `
                    <p>For donations via PayPal:</p>
                    <p>Email: <b>ipagroove@gmail.com</b></p>
                    <a href="https://paypal.me/ipagroove" target="_blank" class="modal-link">Go to PayPal.Me page</a>
                `,
                buttonText: '', // No button for PayPal email in this setup
                copyButtonData: '',
                note: 'Please send funds as "Friend or Family" to avoid fees.'
            },
            ru: {
                title: 'PayPal',
                contentHtml: `
                    <p>Для доната через PayPal:</p>
                    <p>Email: <b>ipagroove@gmail.com</b></p>
                    <a href="https://paypal.me/ipagroove" target="_blank" class="modal-link">Перейти на страницу PayPal.Me</a>
                `,
                buttonText: '',
                copyButtonData: '',
                note: 'Пожалуйста, отправляйте средства как "Другу или семье", чтобы избежать комиссий.'
            },
            ua: {
                title: 'PayPal',
                contentHtml: `
                    <p>Для донату через PayPal:</p>
                    <p>Email: <b>ipagroove@gmail.com</b></p>
                    <a href="https://paypal.me/ipagroove" target="_blank" class="modal-link">Перейти на сторінку PayPal.Me</a>
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
                    <p>Wallet Address: <b>TJCQQHMhKExEuyMXA78mXBAbj1YkMNL3NS</b></p>
                `,
                buttonText: 'Copy wallet address',
                copyButtonData: 'TJCQQHMhKExEuyMXA78mXBAbj1YkMNL3NS',
                note: 'Please send only USDT on TRC20 network.'
            },
            ru: {
                title: 'Binance',
                contentHtml: `
                    <p>Для доната через Binance (USDT TRC20):</p>
                    <p>Адрес кошелька: <b>TJCQQHMhKExEuyMXA78mXBAbj1YkMNL3NS</b></p>
                `,
                buttonText: 'Копировать адрес кошелька',
                copyButtonData: 'TJCQQHMhKExEuyMXA78mXBAbj1YkMNL3NS',
                note: 'Пожалуйста, отправляйте только USDT в сети TRC20.'
            },
            ua: {
                title: 'Binance',
                contentHtml: `
                    <p>Для донату через Binance (USDT TRC20):</p>
                    <p>Адреса гаманця: <b>TJCQQHMhKExEuyMXA78mXBAbj1YkMNL3NS</b></p>
                `,
                buttonText: 'Копіювати адресу гаманця',
                copyButtonData: 'TJCQQHMhKExEuyMXA78mXBAbj1YkMNL3NS',
                note: 'Будь ласка, надсилайте тільки USDT у мережі TRC20.'
            }
        },
        'abank-modal': {
            en: {
                title: 'ABank',
                contentHtml: `
                    <p>ABank Information:</p>
                    <p>Card Number: <b>4323 3450 4333 7048</b></p>
                    <p>Full Name: <b>Alex Kuznetsov</b></p>
                `,
                buttonText: 'Pay',
                payButtonUrl: 'https://pay.a-bank.com.ua/card/tZ5Q1Uw8dbog38NI',
                note: 'Thank you for your contribution!'
            },
            ru: {
                title: 'ABank',
                contentHtml: `
                    <p>Информация об ABank:</p>
                    <p>Номер карты: <b>4323 3450 4333 7048</b></p>
                    <p>ФИО: <b>Алексей Кузнецов</b></p>
                `,
                buttonText: 'Оплатить',
                payButtonUrl: 'https://pay.a-bank.com.ua/card/tZ5Q1Uw8dbog38NI',
                note: 'Спасибо за ваш вклад!'
            },
            ua: {
                title: 'ABank',
                contentHtml: `
                    <p>Інформація про ABank:</p>
                    <p>Номер картки: <b>4323 3450 4333 7048</b></p>
                    <p>ПІБ: <b>Олексій Кузнецов</b></p>
                `,
                buttonText: 'Сплатити',
                payButtonUrl: 'https://pay.a-bank.com.ua/card/tZ5Q1Uw8dbog38NI',
                note: 'Дякуємо за ваш внесок!'
            }
        },
        'telegram-modal': {
            en: {
                title: 'Telegram Wallet',
                contentHtml: `
                    <p>For donations via Telegram Wallet (USDT TRC20):</p>
                    <p>Wallet Address: <b>TDPsJnnVXeBeTkmZqd8fdtn1uhVyiAGe5n</b></p>
                    <img src="https://github.com/iPAGroove/igroove/blob/main/images/IMG_6687.jpeg?raw=true" alt="QR Code" class="qr-code-img" style="width: 150px; height: 150px; display: block; margin: 15px auto;">
                `,
                buttonText: 'Copy wallet address',
                copyButtonData: 'TDPsJnnVXeBeTkmZqd8fdtn1uhVyiAGe5n',
                note: 'Please send only USDT on TRC20 network.'
            },
            ru: {
                title: 'Telegram Wallet',
                contentHtml: `
                    <p>Для доната через Telegram Wallet (USDT TRC20):</p>
                    <p>Адрес кошелька: <b>TDPsJnnVXeBeTkmZqd8fdtn1uhVyiAGe5n</b></p>
                    <img src="https://github.com/iPAGroove/igroove/blob/main/images/IMG_6687.jpeg?raw=true" alt="QR Code" class="qr-code-img" style="width: 150px; height: 150px; display: block; margin: 15px auto;">
                `,
                buttonText: 'Копировать адрес кошелька',
                copyButtonData: 'TDPsJnnVXeBeTkmZqd8fdtn1uhVyiAGe5n',
                note: 'Пожалуйста, отправляйте только USDT в сети TRC20.'
            },
            ua: {
                title: 'Telegram Wallet',
                contentHtml: `
                    <p>Для донату через Telegram Wallet (USDT TRC20):</p>
                    <p>Адреса гаманця: <b>TDPsJnnVXeBeTkmZqd8fdtn1uhVyiAGe5n</b></p>
                    <img src="https://github.com/iPAGroove/igroove/blob/main/images/IMG_6687.jpeg?raw=true" alt="QR Code" class="qr-code-img" style="width: 150px; height: 150px; display: block; margin: 15px auto;">
                `,
                buttonText: 'Копіювати адресу гаманця',
                copyButtonData: 'TDPsJnnVXeBeTkmZqd8fdtn1uhVyiAGe5n',
                note: 'Будь ласка, надсилайте тільки USDT у мережі TRC20.'
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
                // Убедимся, что нет других лишних обработчиков, перед добавлением нового
                existingButton.removeEventListener('click', handleCopyClick);
                existingButton.removeEventListener('click', handlePayClick); // Удаляем возможные предыдущие
                existingButton.addEventListener('click', () => {
                    window.open(data.payButtonUrl, '_blank');
                });
            } else if (data.copyButtonData) {
                // Убедимся, что нет других лишних обработчиков, перед добавлением нового
                existingButton.removeEventListener('click', handlePayClick);
                existingButton.removeEventListener('click', handleCopyClick); // Удаляем возможные предыдущие
                existingButton.addEventListener('click', async () => {
                    const textToCopy = data.copyButtonData;
                    try {
                        await navigator.clipboard.writeText(textToCopy);
                        const originalText = existingButton.textContent;
                        let copiedText = '';
                        if (lang === 'ru') {
                            copiedText = 'Скопировано!';
                        } else if (lang === 'ua') {
                            copiedText = 'Скопійовано!';
                        } else {
                            copiedText = 'Copied!';
                        }
                        existingButton.textContent = copiedText; 
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

    // Dummy functions for removeEventListener
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
