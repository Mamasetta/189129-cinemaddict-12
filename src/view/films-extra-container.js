import AbstractView from "./abstract.js";

const createFilmsExtraContainerTemplate = (title) =>
  `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container"></div>
  </section>`;

export default class FilmsExtraContainer extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createFilmsExtraContainerTemplate(this._title);
  }
}
