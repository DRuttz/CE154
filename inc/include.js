function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (id === "header") setActiveNav();
    });
}

function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-header nav a").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });
}

let slideIndex = 0;
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0) return;
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

window.onload = function() {
  showSlides(slideIndex);
  setInterval(() => { plusSlides(1); }, 5000);
};
