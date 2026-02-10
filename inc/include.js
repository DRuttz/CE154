/**
 * Loads external HTML into a page element
 */
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load " + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (id === "header") {
        setActiveNav();
      }
    })
    .catch(error => console.error(error));
}

/**
 * Navigation Highlighting Logic
 */
function setActiveNav() {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === "index.html") {
    currentPage = "index.html";
  }

  const navLinks = document.querySelectorAll(".site-header nav a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

/**
 * Slideshow Logic
 */
let slideIndex = 0;
let slideTimer;

function initSlideshow() {
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length > 0) {
    showSlides(slideIndex);
    slideTimer = setInterval(() => plusSlides(1), 5000);
  }
}

function plusSlides(n) {
  clearInterval(slideTimer); // Reset timer on click
  slideIndex += n;
  showSlides(slideIndex);
  slideTimer = setInterval(() => plusSlides(1), 5000);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0) return;

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "flex";
}

// Start slideshow after page loads
window.addEventListener('load', initSlideshow);
