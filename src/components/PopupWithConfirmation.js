import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    this._deleteConfirmation = this._popupElement.querySelector(
      ".modal__confirm-delete"
    );
    this._cardElement = null;
  }

  _deleteConfirmationHandler() {
    if (this._cardElement) {
      this._cardElement.remove();
      this._cardElement = null;
      this.close();
    }
    console.log("card deleted");
  }

  open(cardElement) {
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    this._deleteConfirmation.addEventListener("click", () => {
      this._deleteConfirmationHandler();
    });
    super.setEventListeners();
  }
}
