import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css"; // Import the main CSS file for the project
import { initialCards, validationConfig } from "../utils/constants.js";

// Description: This file contains DOM selections, class instance creation, & Event listeners for the Around The U.S. project.

// Cache DOM elements
const cardListEl = document.querySelector(".card__list");

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-edit-form"];
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescInput = profileEditForm.querySelector(
  "#profile-description-input"
);
const profileTitleError = profileEditForm.querySelector(
  "#profile-title-input-error"
);
const profileDescError = profileEditForm.querySelector(
  "#profile-description-input-error"
);

const profileTitleEl = document.querySelector(".profile__title");
const profileDescEl = document.querySelector(".profile__description");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardLinkInput = addCardForm.querySelector("#card-link-input");
const cardTitleError = addCardForm.querySelector("#card-title-input-error");
const cardLinkError = addCardForm.querySelector("#card-link-input-error");

const imageModalImage = document.querySelector(".modal__image");
const imageModalCaption = document.querySelector(".modal__caption");

// Create UserInfo instance
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// Create/ Enable form validation
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute("name");
    const validator = new FormValidator(config, formElement);
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Card creation with event listeners
function getCardElement(data) {
  const card = new Card(data, "#card-template", handlePreviewImage);
  return card.generateCard();
}

// Render card function
function renderCard(item) {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardSection.addItem(cardElement);
}
// Create a new Section instance
const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".card__list"
);

// Render initial cards
cardSection.renderItems();

// Modal instances
const profileEditModalInstance = new ModalWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo(formData);
    profileEditModalInstance.close();
  }
);

const addCardModalInstance = new ModalWithForm(
  "#add-card-modal",
  (formData) => {
    renderCard({ name: formData.title, link: formData.link });
    addCardForm.reset();
    addCardModalInstance.close();
  }
);

const imageModalInstance = new ModalWithImage("#image-modal");
imageModalInstance.setEventListeners();
profileEditModalInstance.setEventListeners();
addCardModalInstance.setEventListeners();

// Image modal preview handler
function handlePreviewImage(cardInstance) {
  const { name, link } = cardInstance.getData();
  imageModalInstance.open({ name, link }); // use the class now!
}

// Initialize page
function initialize() {
  enableValidation(validationConfig);

  // Profile Edit Modal
  // Profile Edit Button click handler
  profileEditBtn.addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    profileTitleInput.value = currentUser.title;
    profileDescInput.value = currentUser.description;
    formValidators["profile-edit-form"].resetValidation();
    profileEditModalInstance.open();
  });

  // Add card
  addCardBtn.addEventListener("click", () => {
    addCardModalInstance.open();
  });
}

// Run initialization on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initialize);
