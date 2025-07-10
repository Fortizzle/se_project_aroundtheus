import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

function handlePreviewImage(cardInstance) {
  const { name, link } = cardInstance.getData();
  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;
  openModal(imageModal);
}

// Description: This file contains the JavaScript code for the Around The U.S. project.
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

// Cache DOM elements
const cardListEl = document.querySelector(".card__list");

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
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
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardLinkInput = addCardForm.querySelector("#card-link-input");
const cardTitleError = addCardForm.querySelector("#card-title-input-error");
const cardLinkError = addCardForm.querySelector("#card-link-input-error");

const imageModal = document.querySelector("#image-modal");
const imageModalImage = document.querySelector(".modal__image");
const imageModalCaption = document.querySelector(".modal__caption");

const closeButtons = document.querySelectorAll(".modal__close");

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
// Create/ Enable form validation
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Utility functions
function openModal(modal) {
  modal.classList.remove("modal_closing");
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.add("modal_closing");
  setTimeout(() => {
    modal.classList.remove("modal_opened", "modal_closing");
  }, 300);
  document.removeEventListener("keydown", handleEscClose);
}

// Card creation with event listeners
function getCardElement(data) {
  const card = new Card(data, "#card-template", handlePreviewImage);
  return card.generateCard();
}
//Close modal when clicking outside of the modal content
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Close modal when pressing Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal_opened");
    if (opened) {
      closeModal(opened);
    }
  }
}
// Initialize form modal
function initializeFormModal(
  validatorInstance,
  inputElements,
  initialValues = null
) {
  // If initial values are provided, set them
  if (initialValues) {
    inputElements.forEach((input, index) => {
      input.value = initialValues[index];
    });
  }

  // Reset validation using the class instance
  validatorInstance.resetValidation();
}

// Render card function
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardListEl[method](cardElement);
}

// Initialize page
function initialize() {
  // Populate initial cards
  initialCards.forEach((data) => {
    renderCard(data, "append");
  });

  // Global close button handlers
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".modal"));
    });
  });

  // Profile Edit Modal
  // Profile Edit Button click handler
  profileEditBtn.addEventListener("click", () => {
    initializeFormModal(
      profileFormValidator,
      [profileTitleInput, profileDescInput],
      [profileTitleEl.textContent, profileDescEl.textContent]
    );

    openModal(profileEditModal);
  });

  //Profile Sumbission Validation
  profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileTitleEl.textContent = profileTitleInput.value;
    profileDescEl.textContent = profileDescInput.value;
    closeModal(profileEditModal);
    profileEditForm.reset(); // Reset the form
  });

  // Add Card Modal
  addCardBtn.addEventListener("click", () => {
    openModal(addCardModal);
  });

  //Add Card Form Sumbission Validation
  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCard = {
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    };

    renderCard(newCard);
    addCardForm.reset(); // Reset the form
    cardFormValidator.resetValidation();
    closeModal(addCardModal);
  });
}

// Run initialization on DOMContentLoaded
window.addEventListener("DOMContentLoaded", initialize);
