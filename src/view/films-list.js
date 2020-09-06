import {createElement} from "../utils.js";

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list"></section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
