// Анимация звезд
const stars = document.querySelector('.stars');
if (stars) {
  const numStars = 130;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.width = star.style.height = (Math.random() * 2.5 + 1) + 'px';
    star.style.background = '#fff';
    star.style.opacity = Math.random() * 0.6 + 0.2;
    star.style.borderRadius = '50%';
    stars.appendChild(star);
  }
}

// Переключение между формами логина/регистрации
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
document.getElementById('toRegister').onclick = e => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = '';
};
document.getElementById('toLogin').onclick = e => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = '';
};
