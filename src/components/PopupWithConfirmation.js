import Popup from "./Popup.js";

const card

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    // this._deleteConfirmation = this._popupElement.querySelector(
    //   ".modal__confirm-delete"
    // );
    this._confirmDeleteBtnEl = this._popupElement.querySelector(
      ".modal__confirm-delete-button"
    );

    // this._cardElement = null;
  }

  _deleteConfirmationHandler() {
    //added
    // if (this._cardElement) {
    //   this._cardElement.remove();
    //   this._cardElement = null;
    //   this.close();
    // }
    this._cardElement.remove();
    console.log("Attempting to delete:", this._cardElement);
  }

  setEventListeners() {
    this._confirmDeleteBtnEl.addEventListener("click", () => {
      this._deleteConfirmationHandler();
    });
    super.setEventListeners();
  }
}
