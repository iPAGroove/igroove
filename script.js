document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.lang-option');
    let activeIndex = 0;

    const setActive = (index) => {
        options.forEach(opt => opt.classList.remove('active'));
        options[index].classList.add('active');
        console.log(`Language set to: ${options[index].dataset.lang.toUpperCase()}`);
    };

    options.forEach((opt, i) => {
        opt.addEventListener('click', () => {
            activeIndex = i;
            setActive(activeIndex);
        });
    });

    // Touch support for swipe
    const switcher = document.getElementById('language-switcher');
    let startX = null;

    switcher.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    switcher.addEventListener('touchend', e => {
        if (startX === null) return;
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 30) {
            if (diff < 0) {
                activeIndex = (activeIndex + 1) % options.length;
            } else {
                activeIndex = (activeIndex - 1 + options.length) % options.length;
            }
            setActive(activeIndex);
        }
        startX = null;
    });

    // Set default language to EN
    activeIndex = 0;
    setActive(activeIndex);
});
