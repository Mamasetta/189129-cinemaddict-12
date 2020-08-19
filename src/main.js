import {FILMS_COUNT, EXTRA_SECTION_TITLES, FilmCardsShowCount} from './constants.js';
import {getNewArray, render, getSortedFilmsByRating, getSortedFilmsByComments} from './utils.js';
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
import {generateFilmData} from './mock/films.js';
import {generateFilterData} from "./mock/filter.js";

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);

const films = getNewArray(FILMS_COUNT, generateFilmData);
const filters = generateFilterData(films);

render(headerElement, createProfileRatingTemplate(), `beforeend`);

render(mainElement, createMainNavigationTemplate(filters), `beforeend`);
render(mainElement, createSortingTemplate(), `beforeend`);
render(mainElement, createFilmsSectionTemplate(), `beforeend`);

const filmsSectionElement = mainElement.querySelector(`.films`);
render(filmsSectionElement, createFilmsContainerTemplate(), `afterbegin`);
EXTRA_SECTION_TITLES.forEach((title) => render(filmsSectionElement, createFilmsExtraContainerTemplate(title), `beforeend`));

const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);

let showingFilmsCount = FilmCardsShowCount.ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsContainerElement, createFilmCardTemplate(film), `beforeend`));

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FilmCardsShowCount.BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const [mostRatedContainer, mostCommentedContainer] = filmsSectionElement.querySelectorAll(`.films-list--extra .films-list__container`);

getSortedFilmsByRating(films).forEach((film) => render(mostRatedContainer, createFilmCardTemplate(film), `beforeend`));
getSortedFilmsByComments(films).forEach((film) => render(mostCommentedContainer, createFilmCardTemplate(film), `beforeend`));

render(footerStatisticsElement, createFooterStatisticsTemplate(films), `beforeend`);

render(bodyElement, createFilmDetailsTemplate(films[0]), `beforeend`);

