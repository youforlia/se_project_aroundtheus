export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    // document.addEventListener("click", this._handleOverlayClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscBtn);
    // document.removeEventListener("click", this._handleOverlayClose);
  }

  _handleEscClose(e) {
    const key = e.key;
    if (key === "Escape") {
      // const openedPopup = document.querySelector("modal_opened");
      // close(openedPopup);
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener(
      "keydown",
      (e) =>
        // if (
        e.target.classList.contains("modal__close") ||
        e.target.classList.contains("modal_opened")
    );
    {
      this.close();
    }
  }
}
