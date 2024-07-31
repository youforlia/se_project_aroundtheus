import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__confirm-container");
    this._deleteBtn = this._popupElement.querySelector(".modal__confirm-delete-button");  
  }

  setSubmitAction(callbackFn) {
    this._deleteConfirmationHandler = callbackFn;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("click", (e) => {
      e.preventDefault();
      this._deleteConfirmationHandler();
    });
  }
}