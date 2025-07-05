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
