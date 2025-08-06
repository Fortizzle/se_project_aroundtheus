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
  setEventListeners() {
    // Close button
    this._modal
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());

    // Click outside modal content
    this._modal.addEventListener("click", (evt) => {
      if (evt.target === this._modal) {
        this.close();
      }
    });
  }
}
