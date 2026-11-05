
document.addEventListener("DOMContentLoaded", async () => {
  async function loadComponent(placeholderId, file) {
    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) return null;

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Could not load ${file}: ${response.status}`);
      }

      placeholder.innerHTML = await response.text();
      return placeholder;
    } catch (error) {
      console.error(`Error loading component: ${file}`, error);
      return null;
    }
  }

  // Load topbar, header, and footer
  await loadComponent(
    "topbar-placeholder",
    "assets/components/topbar.html"
  );

  const header = await loadComponent(
    "header-placeholder",
    "assets/components/header.html"
  );

  await loadComponent(
    "footer-placeholder",
    "assets/components/footer.html"
  );

  // Mobile navigation
  if (header) {
    const toggle = header.querySelector(".nav-toggle");
    const links = header.querySelector(".nav-links");

    if (toggle && links) {
      function closeMenu() {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }

      toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");

        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
      });

      document.addEventListener("click", (event) => {
        if (
          !toggle.contains(event.target) &&
          !links.contains(event.target)
        ) {
          closeMenu();
        }
      });

      links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      // Active navigation link
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

      links.querySelectorAll(".nav-link").forEach((link) => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        }
      });
    }
  }

  // Footer year
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
