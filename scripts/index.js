import {
  showError,
  hideError,
  toggleButtonState,
  enableValidation,
} from "./validate.js";

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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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
const profileSubmitBtn = profileEditForm.querySelector(".modal__button");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescEl = document.querySelector(".profile__description");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardLinkInput = addCardForm.querySelector("#card-link-input");
const cardTitleError = addCardForm.querySelector("#card-title-input-error");
const cardLinkError = addCardForm.querySelector("#card-link-input-error");
const addCardSubmitBtn = addCardForm.querySelector(".modal__button");

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
  const card = cardTemplate.cloneNode(true);
  const imgEl = card.querySelector(".card__image");
  const titleEl = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const delBtn = card.querySelector(".card__delete-button");

  imgEl.src = data.link;
  imgEl.alt = data.name;
  titleEl.textContent = data.name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_liked");
  });

  delBtn.addEventListener("click", () => {
    card.remove();
  });

  imgEl.addEventListener("click", () => {
    imageModalImage.src = data.link;
    imageModalImage.alt = data.name;
    imageModalCaption.textContent = data.name;
    openModal(imageModal);
  });

  return card;
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
  formElement,
  inputElements,
  errorElements,
  submitButton,
  initialValues = null
) {
  // If initial values are provided, set them
  if (initialValues) {
    inputElements.forEach((input, index) => {
      input.value = initialValues[index];
    });
  }

  // Clear error states for all inputs
  inputElements.forEach((input, index) => {
    hideError(input, errorElements[index], validationConfig);
  });

  // Reset button state
  toggleButtonState(inputElements, submitButton, validationConfig);
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

  // Enable validation
  enableValidation(validationConfig);

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
      profileEditForm,
      [profileTitleInput, profileDescInput],
      [profileTitleError, profileDescError],
      profileSubmitBtn,
      [profileTitleEl.textContent, profileDescEl.textContent] // Add initial values here
    );
    openModal(profileEditModal);
  });

  //Profile Sumbition Validation
  profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileTitleEl.textContent = profileTitleInput.value;
    profileDescEl.textContent = profileDescInput.value;
    closeModal(profileEditModal);
    profileEditForm.reset(); // Reset the form
  });

  // Add Card Modal
  addCardBtn.addEventListener("click", () => {
    initializeFormModal(
      addCardForm,
      [cardTitleInput, cardLinkInput],
      [cardTitleError, cardLinkError],
      addCardSubmitBtn
    );
    openModal(addCardModal);
  });

  //Add Card Form Sumbition Validation
  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCard = {
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    };

    renderCard(newCard);
    addCardForm.reset(); // Reset the form
    closeModal(addCardModal);
  });
}

// Run initialization on DOMContentLoaded
window.addEventListener("DOMContentLoaded", initialize);
