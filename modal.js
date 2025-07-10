document.addEventListener('DOMContentLoaded', () => {
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-button');
    const modalOverlay = document.getElementById('modal-overlay');

    // Функция открытия модального окна
    const openModal = (modalId) => {
        const modal = document.querySelector(modalId);
        if (modal) {
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

    // Логика кнопки "Копировать"
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copyText;
            try {
                await navigator.clipboard.writeText(textToCopy);
                const originalText = button.textContent;
                button.textContent = 'Скопировано!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 1500); // Возвращаем исходный текст через 1.5 секунды
            } catch (err) {
                console.error('Не удалось скопировать текст: ', err);
                alert('Не удалось скопировать текст. Пожалуйста, скопируйте вручную: ' + textToCopy);
            }
        });
    });
});
