import AbstractView from './abstract.js';
import {FilterType} from '../constants.js';

// const createFilterName = (name) => (
//   name.split(``).map((letter, index) => (index === 0 ? letter.toUpperCase() : letter)).join(``)
// );
//
// const createFiltersTemplate = (filters) => (
//   [...filters].map(({name, count}) => {
//     return `<a href="#${name}" class="main-navigation__item">${createFilterName(name)}<span class="main-navigation__item-count">${count}</span></a>`;
//   }).join(``)
// );

const createMenuItemTemplate = (filter, currentFilter) => {
  const {type, name, count} = filter;
  return `<a href="#watchlist" class="main-navigation__item ${type === currentFilter ? `main-navigation__item--active` : ``}" data-filter-type="${type}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createMainNavigationTemplate = (filterItems, currentFilter) => {
  const menuItemsTemplate = filterItems
    .map((filter) => createMenuItemTemplate(filter, currentFilter)).join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${currentFilter === FilterType.ALL_MOVIES ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.ALL_MOVIES}">All movies</a>
        ${menuItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
  constructor(filter, currentFilterType) {
    super();
    this._filter = filter;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
