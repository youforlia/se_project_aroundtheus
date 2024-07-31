import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, submitButton) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = document.querySelector(".modal__submit-button");
    this._originalButtonText = this._submitButton.textContent;
  }

  // _getInputValues() {
  //   //collects data from all the input fields
  //   this._inputList = this._popupElement.querySelectorAll(".modal__input");
  //   this._values = {};
  //   this._inputList.forEach((input) => {
  //     this._values[input.name] = input.value;
  //   });

  //   return this._values;
  // }

  _getInputValues() {
    const inputList = this._popupElement.querySelectorAll(".modal__input");
    const values = {};
    inputList.forEach(input => values[input.name] = input.value);
    return values;
  }

  // setEventListeners() {
  //   this._popupForm.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //     this._handleFormSubmit(this._getInputValues());
  //     this.close();
  //   });
  //   super.setEventListeners();
  // }

  // close() {
  //   this._popupForm.reset();
  //   super.close();
  // }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      setLoading(this._submitButton, true);
      this._handleFormSubmit(formData); // Pass form values, not evt
      this.close();
    });
    super.setEventListeners();
  }

}

export function setLoading(isLoading) {
  const button = document.querySelector('.modal__submit-button');
  if (isLoading) {
    button.textContent = 'Saving...';
  } else {
    button.textContent = 'Submit';
  }
}

// export function setLoading(button, isLoading) {
//   if (isLoading) {
//     button.textContent = 'Saving...';
//   } else {
//     button.textContent = 'Submit';
//   }
// }
