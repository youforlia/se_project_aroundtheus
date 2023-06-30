function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscBtn);
  document.addEventListener("click", handleOverlayClose);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscBtn);
  document.removeEventListener("click", handleOverlayClose);
}

// close modal by escape
function handleEscBtn(e) {
  const key = e.key;
  if (key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

// close modal thru overlay click
function handleOverlayClose(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
}

export { openPopup, closePopup, handleEscBtn, handleOverlayClose };
