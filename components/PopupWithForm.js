import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._handleFormSumit = handleFormSubmit;
  }

  _getInputValues() {
    //collects data from all the input fields
    const values = {};
    this._inputList.forEach((element) => {
      values[element.name] = element.value;
    });

    return values;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSumit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
