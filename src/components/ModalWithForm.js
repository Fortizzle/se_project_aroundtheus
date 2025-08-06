import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._form = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const inputElements = this._form.querySelectorAll(".modal__input");
    const formValues = {};
    inputElements.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
