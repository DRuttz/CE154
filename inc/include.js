/**
 * Loads external HTML and initializes scripts only after content is ready
 */
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load " + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Only run these once the HTML is actually in the DOM
      if (id === "header") {
        setActiveNav();
      }
      
      // Initialize slideshow if it exists on the current page
      if (document.getElementsByClassName("mySlides").length > 0) {
        initSlideshow();
      }
      
      // Update basket display if on the basket page
      if (document.getElementById('basket-items-list')) {
        displayBasket();
      }
    })
    .catch(error => console.error(error));
}

/**
 * Highlights the current page in the nav
 */
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".site-header nav a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

/**
 * SLIDESHOW LOGIC
 */
let slideIndex = 0;
let slideTimer;

function initSlideshow() {
  clearInterval(slideTimer); // Prevent multiple timers
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

/**
 * BASKET LOGIC
 */
function addToBasket(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to basket!");
}

function displayBasket() {
    const list = document.getElementById('basket-items-list');
    const totalDisplay = document.getElementById('basket-total');
    if (!list) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = "<p>No items added yet.</p>";
    } else {
        list.innerHTML = cart.map(item => {
            total += item.price;
            return `<div class="basket-item">${item.name} - £${item.price.toFixed(2)}</div>`;
        }).join('');
    }
    totalDisplay.innerText = `Total: £${total.toFixed(2)}`;
}

function clearBasket() {
    localStorage.removeItem('cart');
    displayBasket();
}
