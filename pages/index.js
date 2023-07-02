import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openPopup, closePopup } from "../utils/utils.js";
import { previewModalCloseBtn, previewImageModal } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// export const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

// Wrappers
const cardSection = document.querySelector(".cards");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardForm = addCardModal.querySelector("#add-card-form");

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

// const previewImageModal = document.querySelector("#preview-image-modal");
// const previewImage = previewImageModal.querySelector(".modal__preview-image");
// const previewTitle = previewImageModal.querySelector(".modal__preview-title");
// const previewModalCloseBtn = previewImageModal.querySelector(
//   ".modal__close-button"
// );

// Functions
// function openPopup(popup) {
//   popup.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscBtn);
//   document.addEventListener("click", handleOverlayClose);
// }

// function closePopup(popup) {
//   popup.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscBtn);
//   document.removeEventListener("click", handleOverlayClose);
// }

export function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template");
  const cardEl = card.getView();

  // const cardElement = getCardElement(cardData);
  wrapper.prepend(cardEl);
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
  renderCard({ name, link }, cardSection);

  closePopup(addCardModal);
  addCardForm.reset();
  cardFormValidator.toggleButtonState();
  // toggleButtonState(
  //   [addCardTitleInput, addCardLinkInput],
  //   addCardSubmitBtn,
  //   config
  // );
}

// close modal by escape
// function handleEscBtn(e) {
//   const key = e.key;
//   if (key === "Escape") {
//     const openedPopup = document.querySelector(".modal_opened");
//     closePopup(openedPopup);
//   }
// }

// // close modal thru overlay click
// function handleOverlayClose(e) {
//   if (e.target.classList.contains("modal_opened")) {
//     closePopup(e.target);
//   }
// }

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeBtn = cardElement.querySelector(".cards__like-button");

  // toggle button
  // likeBtn.addEventListener("click", () => {
  //   likeBtn.classList.toggle("cards__like-button_active");
  // });

  // delete button
  // const deleteBtn = cardElement.querySelector(".cards__delete-button");
  // deleteBtn.addEventListener("click", () => {
  //   cardElement.remove();
  // });

  // open image preview
  // cardImageEl.addEventListener("click", () => {
  //   previewImage.src = cardData.link;
  //   previewImage.alt = cardData.name;
  //   previewTitle.textContent = cardData.name;
  //   openPopup(previewImageModal);
  // });

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

initialCards.forEach((cardData) => renderCard(cardData, cardSection));

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
