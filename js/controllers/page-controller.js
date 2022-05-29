import * as modalController from "./modal-controller.js";

export function init() {
  const contactLink = document.querySelector(".contact-link");
  contactLink.addEventListener("click", handleContactLinkClick);
}

function handleContactLinkClick(e) {
  e.preventDefault();
  modalController.showModal();
}
