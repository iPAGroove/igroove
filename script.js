// Аккордеоны FAQ
const acc = document.querySelectorAll(".accordion-btn");
acc.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
