import Popup from '../components/Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementName = this._popup.querySelector('.popup__caption');
    this._elementImage = this._popup.querySelector('.popup__image');
    
  }

  open(image) {
    super.open();
    this._elementName.textContent = image.name
    this._elementImage.src = image.link;
    this._elementImage.alt = image.name;
    
  }

}