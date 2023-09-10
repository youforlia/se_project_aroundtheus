import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._previewTitle = this._popupElement.querySelector(
      "modal__preview-title"
    );
  }

  open(text, link) {
    this._previewImage.src = link;
    this._previewImage.alt = text;
    this._previewTitle.textContent = data.text;
    super.open();
  }
}
