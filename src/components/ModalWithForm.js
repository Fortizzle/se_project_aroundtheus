import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._form = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

    this._inputElements = this._form.querySelectorAll(".modal__input");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const formValues = {};
    inputElements.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
}
