import { api } from "../pages/Api.js";

export default class Card {
  constructor({ name, link, _id, isLiked }, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard ) {
    this.id = _id;
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._handleLikeCard = handleLikeCard;

    this._cardElement = null; // Initialize _cardElement
    this._setEventListeners();
  }

  //EVENT LISTENERS
  // _setEventListeners() {
  //   //card like button
  //   this._cardElement
  //     .querySelector(".cards__like-button")
  //     .addEventListener("click", () => {
  //       this._handleLikeIcon();
  //     });

  //   //card delete button
  //   this._cardElement
  //     .querySelector(".cards__delete-button")
  //     .addEventListener("click", () => {
  //       this._handleDeleteCard(this);
  //     });

  //   //open image preview
  //   this._cardElement
  //     .querySelector(".cards__image")
  //     .addEventListener("click", () => {
  //       this._handleCardClick(this._name, this._link);
  //     });
  // }

  _setEventListeners() {
    // Ensure _cardElement is defined before adding event listeners
    if (!this._cardElement) return;

    // Card like button
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // Card delete button
    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });

    // Open image preview
    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  //EVENT HANDLERS
  // _handleLikeIcon() {
  //   this._cardElement
  //     .querySelector(".cards__like-button")
  //     .classList.toggle("cards__like-button_active");
  // }

  _handleLikeIcon() {
    this._isLiked = !this._isLiked; // Toggle the like state
    this._updateLikeButton();
  
    api.toggleLikeCard(this.id, this._isLiked)
      .then(() => {
        // Successfully updated like status on the server
        console.log(`Card ${this.id} like status updated to ${this._isLiked}`);
      })
      .catch(() => {
        // Revert the like state in case of an error
        this._isLiked = !this._isLiked;
        this._updateLikeButton();
      });
  }
  
  _updateLikeButton() {
    const likeButton = this._cardElement.querySelector(".cards__like-button");
    if (this._isLiked) {
      likeButton.classList.add("cards__like-button_active");
    } else {
      likeButton.classList.remove("cards__like-button_active");
    }
  }

  deleteCard() {
    this._cardElement.remove();
    this._element = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__title").innerText = this._name;
    this._cardElement.querySelector(".cards__image").alt = this._name;

    // Update the like button state based on the initial like state
    this._updateLikeButton();

    this._setEventListeners();
    return this._cardElement;
  }
}
