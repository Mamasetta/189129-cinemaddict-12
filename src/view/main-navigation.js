import AbstractView from "./abstract.js";

const createFilterName = (name) => (
  name.split(``).map((letter, index) => (index === 0 ? letter.toUpperCase() : letter)).join(``)
);

const createFiltersTemplate = (filters) => (
  [...filters].map(({name, count}) => {
    return `<a href="#${name}" class="main-navigation__item">${createFilterName(name)}<span class="main-navigation__item-count">${count}</span></a>`;
  }).join(``)
);

const createMainNavigationTemplate = (filters) =>
  `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${createFiltersTemplate(filters.filtersCount)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;


export default class MainNavigation extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }
}
