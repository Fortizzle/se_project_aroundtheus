export default class Modal {
  constructor({ modalSelector }) {
    this._modal = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //opens modal

  open() {
    this._modal.classList.remove("modal_closing");
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //closes modal
  close() {
    this._modal.classList.add("modal_closing");
    setTimeout(() => {
      this._modal.classList.remove("modal_opened", "modal_closing");
    }, 300);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //listens for esc button
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  // Close button
  setEventListeners() {
    this._modal.addEventListener("mousedown", (evt) => {
      if (
        evt.target === this._modal ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
