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

function setActiveNav() {
  // Get the current filename (e.g., "index.html" or "about.html")
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";

  // Select all links inside the newly loaded header
  const navLinks = document.querySelectorAll(".site-header nav a");

  navLinks.forEach(link => {
    // Remove active class from all first (cleanup)
    link.classList.remove("active");
    
    // If the link's href matches our current page, add the class
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    }
  });
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
