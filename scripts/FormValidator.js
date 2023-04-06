class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = config.formSelector;
    this._form = form;
  }

  enableValidation() {
    this.getInputListeners();
  }

  _getInputListeners() {
    this._toggleButton();
    this._inputList = this._form.querySelectorAll(this.inputSelector);
    this._inputList.array.forEach(element => {
      element.addEventListener('input', () => {
        this.handleFormInput(element);
        this.toggleButton();
      })
    });
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _handleFormInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButton() {
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._isFormValid = this._form.checkValidity();
    this._buttonSubmit.disabled = !this._isFormValid;
    this._buttonSubmit.classlist.toggle(this._inactiveButtonClass, !this._isFormValid);
  }

  clearValidationForm() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }



}

export {FormValidator};