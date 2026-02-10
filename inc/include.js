function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop();

  const navLinks = document.querySelectorAll(".site-header nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}
