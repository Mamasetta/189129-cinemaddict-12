import {CardsShowCount, EXTRA_SECTION_TITLES} from './constants.js';
import {createProfileRatingTemplate} from './view/profile-rating.js';
import {createMainNavigationTemplate} from './view/main-navigation.js';
import {createSortingTemplate} from './view/sorting.js';
import {createFilmsSectionTemplate} from './view/films-section.js';
import {createFilmsContainerTemplate} from './view/films-container.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmsExtraContainerTemplate} from './view/films-extra-container.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {films} from './mock/films.js';
import {generateFilterData} from "./mock/filter.js";

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);

const filters = generateFilterData(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileRatingTemplate(), `beforeend`);

render(mainElement, createMainNavigationTemplate(filters), `beforeend`);
render(mainElement, createSortingTemplate(), `beforeend`);
render(mainElement, createFilmsSectionTemplate(), `beforeend`);

const filmsSectionElement = mainElement.querySelector(`.films`);
render(filmsSectionElement, createFilmsContainerTemplate(), `afterbegin`);
EXTRA_SECTION_TITLES.forEach((title) => render(filmsSectionElement, createFilmsExtraContainerTemplate(title), `beforeend`));

const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);

let showingFilmsCount = CardsShowCount.ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsContainerElement, createFilmCardTemplate(film), `beforeend`));

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + CardsShowCount.BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

// const filmsExtraContainerElements = filmsSectionElement.querySelectorAll(`.films-list--extra .films-list__container`);

// filters.filtersRating.forEach((filterRating) => render(filmsExtraContainerElements, createFilmCardTemplate(filterRating), `beforeend`));

render(footerStatisticsElement, createFooterStatisticsTemplate(films), `beforeend`);

render(bodyElement, createFilmDetailsTemplate(films[0]), `beforeend`);

