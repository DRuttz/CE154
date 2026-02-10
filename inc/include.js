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
