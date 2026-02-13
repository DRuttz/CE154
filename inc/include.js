/* DR24365 */
/* listings details */
const STORE_PRODUCTS = {
  "1": {
    id: "1",
    title: "Horror T-Shirt",
    type: "Apparel",
    price:29.0,
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
    publishedDate:"2025-05-11",
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
    image:"images/tote.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac enim eget lectus luctus ultrices. Aenean congue dignissim efficitur."
  }
};
/* html load function */
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
/* function to highlight current page*/
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

/* slideshow for home page */
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
    return;}
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

/* listeners for navigation and slideshow on homescreen*/
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "inc/header.html");
  loadHTML("footer", "inc/footer.html");
  initSlideshow();
  initProductDetails();
  displayBasket();
  const slidePrev = document.getElementById("slide-prev");
  const slideNext = document.getElementById("slide-next");
  if (slidePrev) {
    slidePrev.addEventListener("click", () => moveSlide(-1));}
  if (slideNext) {
    slideNext.addEventListener("click", () => moveSlide(1));
  }
  const clearBtn = document.getElementById("clear-basket");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearBasket);
  }
});

/* loads product details */
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
/* fetches details and images about the products from the list at the top to display on the details page */
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

 /* non functional add to basket function
 const addButton = document.getElementById("add-to-basket");
  if (addButton) {
    addButton.addEventListener("click", () => addToBasket(product.id));
  }
}*/






