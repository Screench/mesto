import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, {submitCallback}){
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._submitForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__input'));
        this._buttonSubmit = this._formSubmit.querySelector('.popup__button-submit'); //
    }

    //собираем значения полей
    _getInputValues(){
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

    setEventListeners(){
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        })
    }

    close(){
        this._submitForm.reset();
        super.close();
    }

    renderPreloader(loading, displayText) {
        if (!this._buttonSubmit) return;
        if (loading) {
            this.defaultText = this._buttonSubmit.textContent;
            this._buttonSubmit.textContent = displayText;
        } else {
            this._buttonSubmit.textContent = this._defaultText;

            }
    }
};

