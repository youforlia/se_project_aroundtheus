import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, submitButton) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__submit-button");
    // this._originalButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._popupElement.querySelectorAll(".modal__input");
    const values = {};
    inputList.forEach(input => values[input.name] = input.value);
    return values;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this.setLoading(this._submitButton, true);
      this._handleFormSubmit(formData); // Pass form values, not evt
      this.close();
    });
    super.setEventListeners();
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Saving...';
    } else {
      this._submitButton.textContent = 'Submit';
    }
  }
}



