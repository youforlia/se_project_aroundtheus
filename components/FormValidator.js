class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config._inputSelector;
    this._submitButtonSelector = config._submitButtonSelector;
    this._inactiveButtonClass = config._inactiveButtonClass;
    this._inputErrorClass = config._inputErrorClass;
    this._errorClass = config._errorClass;

    this._formElement = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );

    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );

    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!this._inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _hasinValidInput(inputList) {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableSubmitButton(submitButton, inactiveButtonClass);
    } else {
      this._enableSubmitButton(submitButton, inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputEls = [...formElement.querySelectorAll(inputSelector)];
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;
