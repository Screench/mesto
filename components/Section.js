export class Section {
  constructor({renderer}, containerSelector){
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  };

  renderItems(items){
    items.forEach(element => {
      this._renderer(element);
      
    });
  }

  addItem(element){
    this._container.prepend(element);
  }
};