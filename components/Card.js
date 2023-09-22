// import {
//   previewImage,
//   previewTitle,
//   previewImageModal,
// } from "../utils/utils.js";

import { openPopup, closePopup } from "../utils/utils.js";

export default class Card {
  constructor({ name, link, handleImagePreview }, cardSelector) {
    this._name = name;
    this._link = link;
    this._handleImagePreview = handleImagePreview;
    this._cardSelector = cardSelector;
  }

  //EVENT LISTENERS
  _setEventListeners() {
    //card like button
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //card delete button
    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });

    //open image preview
    this._cardImageEl.addEventListener("click", () =>
      this._handleImagePreview({ link: this._link, text: this._name })
    );
  }

  //EVENT HANDLERS
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
    // console.log(this._cardElement);
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
  }

  // _handleImagePreview() {
  //   previewImage.src = this._link;
  //   previewImage.alt = this._name;
  //   previewTitle.textContent = this._name;
  //   openPopup();
  // }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".cards__image");
    this._cardTitleEl = this._cardElement.querySelector(".cards__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._setEventListeners();
    this._cardTitleEl.textContent = this._name;

    return this._cardElement;
  }
}
