import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteConfirmationHandler) {
    super({ popupSelector });
    this._deleteConfirmationHandler = deleteConfirmationHandler;
    this._confirmDeleteBtnEl = this._popupElement.querySelector(
      ".modal__confirm-delete-button"
    );

    this._cardElement = null;

    // this._cardElement = cardElement;
  }

  _deleteConfirmationHandler() {
    this._cardElement.remove();
    console.log("Attempting to delete:", this._cardElement);
  }

  setEventListeners() {
    this._cardElement.querySelector(".modal__confirm")
    .addEventListener("click", () => {
      this._deleteConfirmationHandler();
    });
    super.setEventListeners();
  }
}
