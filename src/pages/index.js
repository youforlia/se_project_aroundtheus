import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api.js";

//APIs
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4a5b23f0-f2a7-4209-a8e7-d3bcf73a20e6",
    "Content-Type": "application/json",
  },
});


export function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteCard,
    handleLikeCard
  );
  // const cardEl = card.getView();
  // return cardEl;
  return card.getView();
}

let userInfo;
let cardSection;

// Load initial cards
api.loadPage()
  .then(([initialCards, userData]) => {
    

    // Initialize and render the card section
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (cardData) => {
          const cardElement = renderCard(cardData)
          cardSection.addItem(cardElement);
        }
      },
      "#cards__list"
    );
    cardSection.renderItems();

    // Update user profile
    userInfo = new UserInfo({
      nameSelector: ".profile__title",
      jobSelector: ".profile__description",
      imageSelector: ".profile__image"
    });
    userInfo.setUserInfo(userData);
  })
  .catch((error) => {
    console.log(error);
  });

// Add card function
function handleAddCardSubmit(values) {
  const name = values.title;
  const link = values.link;
  
  // Call API method to add a new card
  api.addNewCard(name, link)
    .then((newCard) => {
      // Render the newly created card
      const cardElement = renderCard(newCard);

      // Ensure cardSection is accessible and addItem method is defined
      if (cardSection && cardSection.addItem) {
        cardSection.addItem(cardElement);
        addCardPopup.close();
      } else {
        console.error('cardSection or addItem method is undefined.');
      }
    })
    .catch((error) => {
      console.error('Error adding new card:', error);
    });
}

// Preview image
function handleCardClick(name, link) {
  previewImageModal.open(name, link);
}

// Delete card function
function handleDeleteCard(card) {
  confirmModal.open();

  confirmModal.setSubmitAction(() => {
    api.deleteCard(card.id)
    .then(() => {
      card.deleteCard();
      confirmModal.close();
    })
    .catch((error) => {
      console.log(error);
    })
  })
}

// Like Card function
// function handleLikeCard(cardId, isLiked) {
//   return api.updateLikeStatus(cardId, isLiked)
//     .then((updatedCardData) => {
//       return updatedCardData; // Assuming the API returns the updated card data
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error; // Re-throw the error to be handled by the caller
//     });
// }

function handleLikeCard(card) {
  return api.toggleLikeCard(card.getId(), !card.getIsLiked())
    .then((updatedCardData) => {
      console.log(`updatedCardData:`, updatedCardData);
      card.updateLikeValue(updatedCardData.isLiked);
      return updatedCardData; // Assuming the API returns the updated card data
    })
    .catch((error) => {
      console.log(error);
      throw error; // Re-throw the error to be handled by the caller
    });
}

// Profile edit function
function handleProfileEditSubmit(values) {
  // Get the new profile data from the form inputs
  const name = profileTitleInput.value;
  const about = profileDescriptionInput.value;

   // Call the API to update user info
   api.updateUserInfo(name, about)
   .then((userData) => {
     userInfo.setUserInfo(userData); // Update the UI with the new profile data
     editProfilePopup.close();
   })
   .catch((error) => {
     console.log(error);
   });

}

// Wrappers
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addCardPopup.setEventListeners();

const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

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
const confirmModal = new PopupWithConfirmation("#confirm-delete-modal");
confirmModal.setEventListeners();

