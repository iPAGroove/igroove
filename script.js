document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('language-switcher');
  const options = switcher.querySelectorAll('.lang-option');
  let activeIndex = Array.from(options).findIndex(opt => opt.classList.contains('active'));

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

  // Swipe gesture
  let startX = null;

  switcher.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    switcher.classList.add('expanded');
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

    setTimeout(() => {
      switcher.classList.remove('expanded');
    }, 1500);

    startX = null;
  });

  // Hover expand (optional on desktop)
  switcher.addEventListener('mouseenter', () => {
    switcher.classList.add('expanded');
  });
  switcher.addEventListener('mouseleave', () => {
    switcher.classList.remove('expanded');
  });

  // Default language
  setActive(activeIndex);
});
