// Show the browser’s built-in message and flag the input
function showError(inputElem, errorElem, config) {
  errorElem.textContent = inputElem.validationMessage;
  inputElem.classList.add(config.inputErrorClass);
}

// Clear message & styling
function hideError(inputElem, errorElem, config) {
  errorElem.textContent = "";
  inputElem.classList.remove(config.inputErrorClass);
}

// Enable or disable a button on input validity
function toggleButtonState(inputs, button, config) {
  const allValid = inputs.every((input) => input.validity.valid);
  button.disabled = !allValid;
  button.classList.toggle(config.inactiveButtonClass, !allValid);
}

// Attach validation listeners to a single form
function setFormValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  // set initial button state
  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    const errorEl = form.querySelector(`#${input.id}-error`);
    input.addEventListener("input", () => {
      if (input.validity.valid) {
        hideError(input, errorEl, config);
      } else {
        showError(input, errorEl, config);
      }
      toggleButtonState(inputs, button, config);
    });
  });

  // prevent default form submission
  form.addEventListener("submit", (e) => e.preventDefault());
}

//  find every form matching `formSelector`
function enableValidation(config) {
  document
    .querySelectorAll(config.formSelector)
    .forEach((form) => setFormValidation(form, config));
}

export { showError, hideError, toggleButtonState, enableValidation };
