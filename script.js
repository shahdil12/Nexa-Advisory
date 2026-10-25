const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

document.querySelectorAll(".dropdown-panel").forEach((panel) => {
  const hasBusinessAdvisory = Array.from(panel.querySelectorAll("a"))
    .some((link) => link.textContent.trim() === "Business Advisory");

  if (!hasBusinessAdvisory) {
    const advisoryLink = document.createElement("a");
    advisoryLink.href = "contact.html";
    advisoryLink.textContent = "Business Advisory";
    panel.append(advisoryLink);
  }
});

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.querySelector(".sr-only").textContent = isOpen ? "Open navigation" : "Close navigation";
    mainNav.classList.toggle("nav-open", !isOpen);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.matchMedia("(max-width: 900px)").matches) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".sr-only").textContent = "Open navigation";
      mainNav.classList.remove("nav-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const enquiryForm = document.querySelector("[data-whatsapp-form]");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;

    const values = new FormData(enquiryForm);
    const message = [
      "Hello, I would like to discuss your accounting and tax services.",
      `Name: ${values.get("name")}`,
      `Company: ${values.get("company")}`,
      `Mobile: ${values.get("mobile")}`,
      `Email: ${values.get("email")}`,
      `Business activity: ${values.get("activity")}`,
      `Service required: ${values.get("service")}`,
      `Message: ${values.get("message") || "Not provided"}`
    ].join("\n");
    window.location.assign(`https://wa.me/?text=${encodeURIComponent(message)}`);
  });
}
