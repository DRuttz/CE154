/**
 * Loads external HTML (header/footer) and initializes page-specific logic
 */
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load " + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Logic that must run AFTER the header is loaded
      if (id === "header") {
        setActiveNav();
      }
      
      // Check for slideshow or basket elements every time a component loads
      if (document.querySelector(".mySlides")) {
        initSlideshow();
      }
      if (document.getElementById('basket-items-list')) {
        displayBasket();
      }
    })
    .catch(error => console.error(error));
}

/**
 * Navigation Highlighting Logic
 */
function setActiveNav() {
  const path = window.location.pathname;
  let page = path.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".site-header nav a");
  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (linkHref === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * SLIDESHOW LOGIC
 */
let slideIndex = 0;
let slideTimer = null;

function initSlideshow() {
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length > 0) {
    if (slideTimer) clearInterval(slideTimer);
    showSlides(slideIndex);
    slideTimer = setInterval(() => plusSlides(1), 5000);
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

/**
 * BASKET LOGIC
 */
function addToBasket() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || "Unknown Artwork";
    const price = parseFloat(params.get('price')) || 0;

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
        list.innerHTML = "<p>Your basket is currently empty.</p>";
    } else {
        list.innerHTML = cart.map(item => {
            total += item.price;
            return `<div class="basket-item"><span>${item.name}</span><span>£${item.price.toFixed(2)}</span></div>`;
        }).join('');
    }
    if (totalDisplay) totalDisplay.innerText = `Total: £${total.toFixed(2)}`;
}

function clearBasket() {
    localStorage.removeItem('cart');
    displayBasket();
}
