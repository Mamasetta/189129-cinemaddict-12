import AbstractView from './abstract.js';

export default class FilmsExtraContainer extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">${this._title}</h2>
      </section>`
    );
  }
}
