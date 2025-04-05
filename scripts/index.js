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

// Image Modal Elements
const imageModal = document.querySelector("#image-modal");
const imageModalImage = document.querySelector(".modal__image");

console.log("imageModal:", imageModal);
if (!imageModal) {
  console.error("imageModal is not found! Check if it exists in the HTML.");
}

/* Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Elements for new cards modal */
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addModalCloseButton = document.querySelector("#add-modal-close-button");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");

/* Functions */

// Universal open modal function
function openModal(modal) {
  modal.classList.remove("modal_closing");
  modal.classList.add("modal_opened");
}

// Universal close modal function
function closeModal(modal) {
  modal.classList.add("modal_closing");
  setTimeout(() => {
    modal.classList.remove("modal_opened", "modal_closing");
  }, 1000);
}
/* Revised getCardElement with all event listeners */
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Set the card data
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  // Attach event listener for like button (BEM modifier)
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_liked");
  });

  // Attach event listener for delete button
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //* Event listeners for images*
  cardImageEl.addEventListener("click", () => {
    const imageModal = document.querySelector("#image-modal");
    const modalImage = imageModal.querySelector(".modal__image");
    const caption = imageModal.querySelector(".image-modal__caption");

    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    if (caption) {
      caption.textContent = cardData.name;
    }

    openModal(imageModal);
  });

  return cardElement;
}

/* Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// Load Initial Cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  console.log("Card created with listeners for:", cardData.name);
  cardListEl.append(cardElement);
});

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);

  console.log("New card added with event listener:", cardData.name);
  addCardForm.reset();
  closeModal(addCardModal);

  console.log("Add Card Modal Closed");
}

/* Event Listeners */
// Profile Edit Modal
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Add Card Modal
addCardButton.addEventListener("click", () => {
  console.log("Add Card button clicked");
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

// Close button listeners
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});
