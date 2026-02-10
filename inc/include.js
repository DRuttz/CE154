/**
 * Loads external HTML into a page element
 * Used for header and footer includes
 */
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load " + file);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Only set active nav AFTER header is loaded
      if (id === "header") {
        setActiveNav();
      }
    })
    .catch(error => {
      console.error(error);
    });
}

/**
 * Automatically highlights the active navigation link
 * based on the current page URL
 */
function setActiveNav() {
  // Get current page name (fallback to index.html)
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".site-header nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

let slideIndex = 0;
let slideTimer;

// This function starts the slideshow process
function initSlideshow() {
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        showSlides();
        // Start the automatic timer (5000ms = 5 seconds)
        slideTimer = setInterval(() => plusSlides(1), 5000);
    }
}

function plusSlides(n) {
    // Reset timer when user manually clicks so it doesn't skip immediately
    clearInterval(slideTimer);
    slideTimer = setInterval(() => plusSlides(1), 5000);
    
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
    // Reset index if it goes out of bounds
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    if (n === undefined) { n = slideIndex; }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Display the current slide
    slides[slideIndex].style.display = "flex";
}

// Call the init function after the header/content is loaded
// Since you use loadHTML for the header, call it there or in the window.onload
window.addEventListener('load', initSlideshow);
