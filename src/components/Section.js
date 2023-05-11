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

  appendItem(item){
    this._container.append(item);
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}

