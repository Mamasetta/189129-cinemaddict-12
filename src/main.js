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

const CARDS_COUNT = 5;
const EXTRA_COUNT = 2;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileRatingTemplate(), `beforeend`);

render(mainElement, createMainNavigationTemplate(), `beforeend`);
render(mainElement, createSortingTemplate(), `beforeend`);
render(mainElement, createFilmsSectionTemplate(), `beforeend`);

const filmsSectionElement = mainElement.querySelector(`.films`);
render(filmsSectionElement, createFilmsContainerTemplate(), `afterbegin`);
new Array(EXTRA_COUNT).fill(``).forEach(() => render(filmsSectionElement, createFilmsExtraContainerTemplate(), `beforeend`));

const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);
new Array(CARDS_COUNT).fill(``).forEach(() => render(filmsContainerElement, createFilmCardTemplate(), `beforeend`));

const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

const filmsExtraContainerElements = filmsSectionElement.querySelectorAll(`.films-list--extra .films-list__container`);
filmsExtraContainerElements.forEach((filmsExtraContainerElement) => {
  new Array(EXTRA_COUNT).fill(``).forEach(() => render(filmsExtraContainerElement, createFilmCardTemplate(), `beforeend`));
});

render(footerStatisticsElement, createFooterStatisticsTemplate(), `beforeend`);

render(bodyElement, createFilmDetailsTemplate(), `beforeend`);
