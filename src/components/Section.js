export class Section{
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderItems(elements, user){
    elements.forEach(element => {
      this._renderer(element, user);
    });
  }

  addItem(element){
    this._container.append(element);//
  }

  prependItem(element) {
    this._container.prepend(element);//
  }
}

