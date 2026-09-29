/* ==========================================================================
   Family & Consumer Law Clinic — shared behavior
   ========================================================================== */

// 1) SET YOUR INTAKE FORM LINK HERE — this is the only place you need to edit.
//    Every "Start Intake" button on every page pulls its href from this constant.
const INTAKE_FORM_URL = "https://indiana-arp.cliogrow.com/intake/c43cd7e539ab085034a1162c6adc421a"; 
const NETWORK_FORM_URL = "https://indiana-arp.cliogrow.com/intake/dd757ccdccc90113b9f196272fe44f16"; 


document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Wire up every intake button/link on the page
  document.querySelectorAll("[data-intake-link]").forEach((el) => {
    el.setAttribute("href", INTAKE_FORM_URL);
  });
  document.querySelectorAll("[data-network-link]").forEach((el) => {
    el.setAttribute("href", NETWORK_FORM_URL);
  });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    const setMenuState = (isOpen, returnFocus = false) => {
      links.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      toggle.innerHTML = isOpen ? "&times;" : "&#9776;";
      if (returnFocus) toggle.focus();
    };

    toggle.addEventListener("click", () => {
      setMenuState(!links.classList.contains("is-open"));
    });

    // Close menu when a link is tapped (mobile)
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && links.classList.contains("is-open")) {
        setMenuState(false, true);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860 && links.classList.contains("is-open")) {
        setMenuState(false);
      }
    });
  }
});
