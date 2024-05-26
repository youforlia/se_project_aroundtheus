import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "./Api.js";

//APIs
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "4a5b23f0-f2a7-4209-a8e7-d3bcf73a20e6",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    renderCard(cards);
  })
  .catch((error) => {
    console.error(error);
  });

// Wrappers
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

const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addCardPopup.setEventListeners();

const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#cards__list"
);
cardSection.renderItems();

// Elements Edit Modal
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileCloseBtn = profileEditModal.querySelector(".modal__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardBtn = document.querySelector(".profile__add-button");

export function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteCard
  );
  const cardEl = card.getView();

  //add items here
  cardSection.addItem(cardEl);
}

function handleProfileEditSubmit(values) {
  userInfo.setUserInfo(values);
  editProfilePopup.close();
}

function handleAddCardSubmit(values) {
  const name = values.title;
  const link = values.link;
  {
    return renderCard({ name, link });
  }
}

function handleCardClick(name, link) {
  previewImageModal.open(name, link);
}

function handleDeleteCard(card) {
  confirmModal.open();
}

// Edit Modal Listeners
profileEditBtn.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileTitleInput.value = user.name;
  profileDescriptionInput.value = user.job;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

// Add Card Modal Listeners
addCardBtn.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  addCardPopup.open();
});

// Form Validator
const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, addCardForm);
cardFormValidator.enableValidation();

// Delete Confirmation
// instantiate PopupWithConfirmation
const confirmModal = new PopupWithConfirmation("#confirm-modal");
confirmModal.setEventListeners();

//
// const editProfilePopup = new PopupWithForm(
//   "#profile-edit-modal",
//   handleProfileEditSubmit
// );
// editProfilePopup.setEventListeners();

// //const previewImageModal = new PopupWithImage("#preview-image-modal");
// previewImageModal.setEventListeners();
