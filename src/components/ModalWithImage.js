import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._image = this._modal.querySelector(".modal__image");
    this._caption = this._modal.querySelector(".modal__caption");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
