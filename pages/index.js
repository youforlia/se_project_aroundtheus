import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import { openPopup, closePopup } from "../utils/utils.js";
import { previewModalCloseBtn } from "../utils/utils.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";

// Wrappers
// const cardSection = document.querySelector(".cards");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

const cardSection = new Section({
  items: initialCards,
  renderer: renderCard,
});

cardSection.renderItems();

//call render items method here

// Elements Edit Modal
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileCloseBtn = profileEditModal.querySelector(".modal__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardSubmitBtn = addCardModal.querySelector(".modal__button");

// Elements Add Card Modal
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardContentEl = document.querySelector(".cards");
const addCardBtn = document.querySelector(".profile__add-button");
const addCardCloseBtn = addCardModal.querySelector(".modal__close-button");
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardLinkInput = document.querySelector("#add-card-link-input");

export function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardEl = card.getView();

  //add items here
  addItem(item);
  this._containerSelector.prepend(item);

  // const cardElement = getCardElement(cardData);
  //   wrapper.prepend(cardEl);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  renderCard({ name, link });

  closePopup(addCardModal);
  addCardForm.reset();
  cardFormValidator.toggleButtonState();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeBtn = cardElement.querySelector(".cards__like-button");

  // set the path to the image to the link field of the object
  const cardImageSrc = cardData.link;
  cardImageEl.setAttribute("src", cardImageSrc);
  // cardImageEl.setAttribute("alt", myObject.name);
  cardImageEl.setAttribute("alt", cardData.name);
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

// Edit Modal Listeners
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileCloseBtn.addEventListener("click", () => closePopup(profileEditModal));

// Add Card Modal Listeners
addCardBtn.addEventListener("click", () => openPopup(addCardModal));
addCardCloseBtn.addEventListener("click", () => closePopup(addCardModal));

// Form Submit Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData));

previewModalCloseBtn.addEventListener("click", () =>
  closePopup(previewImageModal)
);

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Form Validator
const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, addCardForm);
cardFormValidator.enableValidation();
