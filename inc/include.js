/**
 * Loads external HTML and triggers dependent scripts
 */
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load " + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // 1. Handle Navigation Highlighting
      if (id === "header") {
        setActiveNav();
      }
      
      // 2. SAFETY CHECK: Try to start slideshow after every load
      // This ensures if index.html is ready, the slideshow starts immediately
      initSlideshow();
    })
    .catch(error => console.error(error));
}

let slideIndex = 0;
let slideTimer = null; // Track the timer globally

function initSlideshow() {
  const slides = document.getElementsByClassName("mySlides");
  
  // Only proceed if slides actually exist on this page
  if (slides.length > 0) {
    // Clear any old timers to prevent "double-speed" sliding
    if (slideTimer) clearInterval(slideTimer);
    
    showSlides(slideIndex);
    
    // Set the new timer
    slideTimer = setInterval(() => {
      plusSlides(1);
    }, 5000);
  }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

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

// Keep this for the very first page load
window.addEventListener('load', initSlideshow);
