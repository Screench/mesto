export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._inputSelector = config.inputSelector;
    this._formSelector = config.formSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
  }

  _showInputError(inputItem) {
    const errorElement = this._form.querySelector(`#${inputItem.id}-error`);
    inputItem.classList.add(this._inputErrorClass);
    inputItem.classList.add(this._errorClass);
    errorElement.textContent = inputItem.validationMessage;
  }

  _hideInputError(inputItem) {
    const errorElement = this._form.querySelector(`#${inputItem.id}-error`);
    inputItem.classList.remove(this._errorClass);
    inputItem.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _handleFormInput(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem);
    } else {
      this._hideInputError(inputItem);
    }
  }

  _toggleSubmitButton() {
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._isFormValid = this._form.checkValidity();
    this._buttonSubmit.disabled = !this._isFormValid;
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !this._isFormValid);
  }

  clearValidationForm() {
    this._toggleSubmitButton();
    this._inputList.forEach((inputItem) => {
      this._hideInputError(inputItem);
    })
  }

  enableValidation() {
    this._setInputListeners();
  };

  _setInputListeners() {
    this._toggleSubmitButton();
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._handleFormInput(inputItem);
        this._toggleSubmitButton();
      });
    })
  };
}