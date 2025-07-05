// НЕОНОВЫЕ ЗВЁЗДЫ с легким движением
const stars = document.querySelector('.stars');
if (stars) {
  const numStars = 90;
  const starArr = [];
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    // Начальные координаты
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2.6 + 1.8;
    star.style.left = x + 'vw';
    star.style.top = y + 'vh';
    star.style.width = star.style.height = size + 'px';
    // Сохраняем параметры для анимации движения
    star.dataset.x = x;
    star.dataset.y = y;
    star.dataset.amp = Math.random() * 1.8 + 0.4; // Амплитуда
    star.dataset.freq = Math.random() * 0.9 + 0.5; // Частота
    starArr.push(star);
    stars.appendChild(star);
  }
  // Лёгкое движение и мерцание
  setInterval(() => {
    const now = Date.now() * 0.001;
    starArr.forEach((star, i) => {
      const baseX = parseFloat(star.dataset.x);
      const baseY = parseFloat(star.dataset.y);
      const amp = parseFloat(star.dataset.amp);
      const freq = parseFloat(star.dataset.freq);
      star.style.left = (baseX + Math.sin(now * freq + i) * amp) + 'vw';
      star.style.top  = (baseY + Math.cos(now * freq + i) * amp) + 'vh';
    });
  }, 33); // ~30 fps
}
