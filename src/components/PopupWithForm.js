import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__submit-button");
    // this._originalButtonText = this._submitButton.textContent;

    // fix the initial button text only once in the constructor
    this._submitBtnText = this._submitButton ? this._submitButton.textContent : '';

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
      this.setLoading(true);
      this._handleFormSubmit(formData); // Pass form values, not evt
    });
    super.setEventListeners();
  }

  setLoading(isLoading, loadingText = 'Saving...') {
    if (this._submitButton) {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = this._submitBtnText;
      }
    }
  }

  close(){
    super.close();
    this._popupForm.reset(); // Reset the form fields
  }
}



