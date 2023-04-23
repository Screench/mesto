import Popup from '../components/Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._elementImage = this._popup.querySelector('.popup__image');
    this._elementTitle = this._popup.querySelector('.popup__caption');
  }

  open(image){
    super.open;
    this._elementTitle.textContent = image.name;
    this._elementImage.src = image.link;
    this._elementImage.alt = image.name;  
  }
  };
