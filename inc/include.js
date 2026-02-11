function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load " + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // FIX: Only run these AFTER the HTML is actually on the page
      if (id === "header") {
        setActiveNav();
      }
      
      // If we are on index.html, start the slideshow once the container is ready
      if (document.querySelector(".mySlides")) {
        initSlideshow();
      }
    })
    .catch(error => console.error(error));
}

function setActiveNav() {
  // Extract the filename from the URL path (e.g., 'about.html')
  let path = window.location.pathname;
  let page = path.split("/").pop();
  
  // Default to index.html if path is empty (homepage)
  if (page === "" || page === undefined) {
    page = "index.html";
  }

  const navLinks = document.querySelectorAll(".site-header nav a");

  navLinks.forEach(link => {
    // Get just the filename from the link's href attribute
    const linkHref = link.getAttribute("href");
    
    if (linkHref === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// SLIDESHOW LOGIC
let slideIndex = 0;
let slideTimer;

function initSlideshow() {
  clearInterval(slideTimer); // Clear any old timers
  showSlides(slideIndex);
  slideTimer = setInterval(() => plusSlides(1), 5000);
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
