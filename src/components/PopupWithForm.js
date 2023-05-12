import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._submitForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__input'));
        this._submitButton = this._submitForm.querySelector('.popup__submit-btn');
    }

    //собираем значения полей
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;

    }

    //устанавливаем значения полей
    setInputValues = (data) => {
        this._inputList.forEach((input, i) => {
            input.value = Object.values(data)[i];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            
        })
    }

    close() {
        this._submitForm.reset();
        super.close();
    }

    renderPreloader(isLoading, buttonText) {
        if (!this._submitButton) return;
        if (isLoading) {
            this.defaultText = this._submitButton.textContent;
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this.defaultText;

        }
    }
};

