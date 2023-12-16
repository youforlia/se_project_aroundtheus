import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._deleteConfirmation = this._popupElement.querySelector(
      ".modal__confirm-delete"
    );
  }

  setEventListeners() {
    this._deleteConfirmation.addEventListener("click", () => {
      this._deleteConfirmation();
    });
  }
}
