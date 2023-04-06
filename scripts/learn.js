class Todo {
  constructor (task, selector, handeTitleClick) {
    this._task = task;
    this._selector = selector;
    this._handleTitleClick = handeTitleClick;
  }

  getView() {
    const element = document.querySelector(this._selector);
    element.querySelector('.todo__title').addEventListener('click', () => {this._handleTitleClick()});
  }
}

const handeTitleClick = () => {
  console.log("Открыть попап");
}
const handeTitleClick2 = () => {
  console.log("Открыть тултип");
}

const todo1 = new Todo("hgfghdfghdfgh", ".todo", handeTitleClick);
todo1.getView();

const todo2 = new Todo("пerthertherth", ".todo_second", handeTitleClick2);
todo2.getView();

