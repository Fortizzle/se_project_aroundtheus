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

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is fully loaded");

  /*Elements*/

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

  /*Functions*/

  function openModal(modal) {
    modal.classList.add("modal_opened");
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
  }

  function getCardElement(cardData) {
    //clone the template element with all its content and store it in a cardElement variable
    const cardElement = cardTemplate.cloneNode(true);
    //access the card title and image and store them in variables
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    //set the path to the image to the link field of the object
    //set the image alt text to the name field of the object
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    //set the card title to the name field of the object, too
    cardTitleEl.textContent = cardData.name;
    //return the ready HTML element with the filled-in data
    return cardElement;
  }

  /* Event Handlers*/

  function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
  }

  function handleAddCardSubmit(e) {
    e.preventDefault();
    const cardData = {
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    };

    const cardElement = getCardElement(cardData);
    addLikeListeners(cardElement);
    cardListEl.prepend(cardElement);

    addCardForm.reset();
    closeModal(addCardModal);
  }

  function addLikeListeners(cardElement) {
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("liked");
    });
  }

  /*Event Listeners*/

  // Profile Edit Modal
  profileEditButton.addEventListener("click", () =>
    openModal(profileEditModal)
  );
  modalCloseButton.addEventListener("click", () =>
    closeModal(profileEditModal)
  );
  profileEditForm.addEventListener("submit", handleProfileEditSubmit);

  // Add Card Modal
  addCardButton.addEventListener("click", () => openModal(addCardModal));
  addModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
  addCardForm.addEventListener("submit", handleAddCardSubmit);

  // Load Initial Cards
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    addLikeListeners(cardElement); // Attach the like button event listener
    cardListEl.prepend(cardElement);
  });
});
