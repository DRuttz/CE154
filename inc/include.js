/* Registration Number: REPLACE_WITH_YOUR_REG_NUMBER */
/* ==========================================================================
   Shared Data for Merchandise and Product Detail Pages
   ========================================================================== */
const STORE_PRODUCTS = {
  "1": {
    id: "1",
    title: "Horror T-Shirt",
    type: "Apparel",
    price: 29.0,
    publishedDate: "2025-03-14",
    image: "images/tshirt.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere dictum est, eu dictum ligula volutpat vitae. Aenean placerat pulvinar lectus in finibus."
  },
  "2": {
    id: "2",
    title: "Horror Poster",
    type: "Poster",
    price: 18.0,
    publishedDate: "2025-04-02",
    image: "images/poster.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at turpis dapibus, ultricies lacus vel, pulvinar mauris. Etiam condimentum sodales sapien."
  },
  "3": {
    id: "3",
    title: "Horror Mug",
    type: "Homeware",
    price: 16.5,
    publishedDate: "2025-05-11",
    image: "images/mug.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula enim quis risus dignissim, ac tincidunt lorem tincidunt. Cras iaculis sem nec leo volutpat."
  },
  "4": {
    id: "4",
    title: "Horror Print",
    type: "Print",
    price: 46.0,
    publishedDate: "2025-06-20",
    image: "images/print.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed varius lorem. Donec suscipit sapien at pulvinar eleifend."
  },
  "5": {
    id: "5",
    title: "Horror Journal",
    type: "Stationery",
    price: 12.0,
    publishedDate: "2025-08-01",
    image: "images/journal.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus vulputate justo, et feugiat dui ultricies ut. Nulla facilisi."
  },
  "6": {
    id: "6",
    title: "Horror Tote",
    type: "Accessories",
    price: 24.0,
    publishedDate: "2025-09-17",
    image: "images/tote.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac enim eget lectus luctus ultrices. Aenean congue dignissim efficitur."
  }
};

/* ==========================================================================
   Include Loader and Navigation State
   ========================================================================== */
function loadHTML(id, file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }
      return response.text();
    })
    .then((content) => {
      const target = document.getElementById(id);
      if (!target) {
        return;
      }
      target.innerHTML = content;
      if (id === "header") {
        setActiveNav();
      }
    })
    .catch((error) => console.error(error));
}

function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-list a");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ==========================================================================
   Home Slideshow
   ========================================================================== */
let slideIndex = 0;
let slideTimer = null;

function initSlideshow() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) {
    return;
  }
  showSlide(0);
  if (slideTimer) {
    clearInterval(slideTimer);
  }
  slideTimer = setInterval(() => moveSlide(1), 5000);
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) {
    return;
  }
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === slideIndex);
  });
}

function moveSlide(step) {
  showSlide(slideIndex + step);
}

/* ==========================================================================
   Product Detail Rendering
   ========================================================================== */
function initProductDetails() {
  const titleElement = document.getElementById("product-title");
  if (!titleElement) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "1";
  const product = STORE_PRODUCTS[productId];

  if (!product) {
    titleElement.textContent = "Product not found";
    const description = document.getElementById("product-description");
    if (description) {
      description.textContent = "Lorem ipsum dolor sit amet, product details are unavailable for this item.";
    }
    return;
  }

  document.getElementById("product-id").textContent = product.id;
  document.getElementById("product-title").textContent = product.title;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-type").textContent = product.type;
  document.getElementById("product-date").textContent = product.publishedDate;
  document.getElementById("product-price").textContent = `£${product.price.toFixed(2)}`;

  const productImage = document.getElementById("product-image");
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = `${product.title} thumbnail image`;
  }

  const addButton = document.getElementById("add-to-basket");
  if (addButton) {
    addButton.addEventListener("click", () => addToBasket(product.id));
  }
}

/* ==========================================================================
   Basket CRUD Logic: add, update quantity, remove, clear
   ========================================================================== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToBasket(productId) {
  const product = STORE_PRODUCTS[productId];
  if (!product) {
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, title: product.title, price: product.price, qty: 1 });
  }

  saveCart(cart);
  alert(`${product.title} added to basket.`);
}

function updateQty(productId, qty) {
  const parsed = Number(qty);
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);

  if (!item) {
    return;
  }

  if (Number.isNaN(parsed) || parsed <= 0) {
    const filtered = cart.filter((entry) => entry.id !== productId);
    saveCart(filtered);
  } else {
    item.qty = Math.floor(parsed);
    saveCart(cart);
  }

  displayBasket();
}

function removeItem(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  displayBasket();
}

function clearBasket() {
  localStorage.removeItem("cart");
  displayBasket();
}

function displayBasket() {
  const list = document.getElementById("basket-items-list");
  const totalElement = document.getElementById("basket-total");
  if (!list || !totalElement) {
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = '<p class="muted">Your basket is currently empty.</p>';
    totalElement.textContent = "£0.00";
    return;
  }

  let total = 0;

  list.innerHTML = cart
    .map((item) => {
      total += item.price * item.qty;
      return `
        <div class="basket-item">
          <div>
            <strong>${item.title}</strong><br>
            <span class="muted">£${item.price.toFixed(2)} each</span>
          </div>
          <label>
            Qty
            <input
              class="qty-input"
              type="number"
              min="1"
              value="${item.qty}"
              aria-label="Quantity for ${item.title}"
              onchange="updateQty('${item.id}', this.value)"
            >
          </label>
          <strong>£${(item.price * item.qty).toFixed(2)}</strong>
          <button class="btn btn-danger" type="button" onclick="removeItem('${item.id}')">Remove</button>
        </div>
      `;
    })
    .join("");

  totalElement.textContent = `£${total.toFixed(2)}`;
}

/* ==========================================================================
   Common Page Init
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "inc/header.html");
  loadHTML("footer", "inc/footer.html");
  initSlideshow();
  initProductDetails();
  displayBasket();

  const slidePrev = document.getElementById("slide-prev");
  const slideNext = document.getElementById("slide-next");
  if (slidePrev) {
    slidePrev.addEventListener("click", () => moveSlide(-1));
  }
  if (slideNext) {
    slideNext.addEventListener("click", () => moveSlide(1));
  }

  const clearBtn = document.getElementById("clear-basket");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearBasket);
  }
});


