/* ==========================================================================
   Family & Consumer Law Clinic — shared behavior
   ========================================================================== */

// 1) SET YOUR INTAKE FORM LINK HERE — this is the only place you need to edit.
//    Every "Start Intake" button on every page pulls its href from this constant.
const INTAKE_FORM_URL = "https://indiana-arp.cliogrow.com/intake/47e7fb3128ffb807436385b6e7e74133"; 
const NETWORK_FORM_URL = "https://indiana-arp.cliogrow.com/intake/dd757ccdccc90113b9f196272fe44f16"; 


document.addEventListener("DOMContentLoaded", () => {
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
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is tapped (mobile)
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
