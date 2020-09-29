import AbstractView from './abstract.js';
import {SortingType} from '../constants.js';

export default class Sorting extends AbstractView {
  constructor() {
    super();
    this._sortingTypeChangeHandler = this._sortingTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<ul class="sort">
      <li><a href="#" data-sorting-type="${SortingType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sorting-type="${SortingType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sorting-type="${SortingType.RATING}" class="sort__button">Sort by rating</a></li>
      </ul>`
    );
  }

  setSortingTypeChangeHandler(callback) {
    this._callback.sortingTypeChangeHandler = callback;
    this.getElement().querySelectorAll(`.sort__button`).forEach((element) => element.addEventListener(`click`, this._sortingTypeChangeHandler));
  }

  _sortingTypeChangeHandler(evt) {
    if (evt.target.nodeName !== `A`) {
      return;
    }

    evt.preventDefault();

    this._callback.sortingTypeChangeHandler(evt.target.dataset.sortingType);
    this.getElement().querySelectorAll(`.sort__button`).forEach((element) => element.classList.remove(`sort__button--active`));

    evt.target.classList.add(`sort__button--active`);
  }
}
