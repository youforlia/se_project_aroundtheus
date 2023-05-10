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

// Wrappers
const cardElement = document.querySelector(".cards");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");

// Elements
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileCloseBtn = profileEditModal.querySelector(".modal__close-button");
const addCardCloseBtn = addCardModal.querySelector(".modal__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardContentEl = document.querySelector(".cards");
const addCardBtn = document.querySelector(".profile__add-button");

// const AddNewCardTitle = document.querySelector("#add-card-title-input");
// const AddNewCardLink = document.querySelector("#add-card-link-input");
const AddCardTitleInput = document.querySelector("#add-card-title-input");
const AddCardLinkInput = document.querySelector("#add-card-link-input");

// Functions
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardContentEl.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = AddCardTitleInput.value;
  const link = AddCardLinkInput.value;
  renderCard({ name, link }, cardElement);

  closePopup(addCardModal);
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
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

initialCards.forEach((cardData) => renderCard(cardData, cardElement));
