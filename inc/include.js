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

/**
 * Adds an item to the basket using URL parameters
 */
function addToBasket() {
    // 1. Get the name and price from the URL (?name=Work%20One&price=45)
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || "Unknown Item";
    const price = parseFloat(params.get('price')) || 0;

    // 2. Get existing cart from LocalStorage or start a new array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 3. Add the new item
    cart.push({ name, price });

    // 4. Save it back to LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(name + " has been added to your basket!");
}

/**
 * Displays the items on the basket.html page
 */
function displayBasket() {
    const list = document.getElementById('basket-items-list');
    const totalDisplay = document.getElementById('basket-total');
    
    if (!list) return; // Exit if we aren't on the basket page

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = "<p>Your basket is currently empty.</p>";
    } else {
        list.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `
                <div class="basket-item">
                    <span>${item.name}</span>
                    <span>£${item.price.toFixed(2)}</span>
                </div>`;
        }).join('');
    }
    
    if (totalDisplay) {
        totalDisplay.innerText = `Total: £${total.toFixed(2)}`;
    }
}
