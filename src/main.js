import {FILMS_COUNT, EXTRA_SECTION_TITLES, FilmCardsShowCount} from './constants.js';
import {getNewArray, renderElement, RenderPosition, getSortedFilmsByRating, getSortedFilmsByComments} from './utils.js';

import ProfileRatingView from './view/profile-rating.js';
import MainNavigationView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import FilmsSectionView from './view/films-section.js';
import FilmsContainerView from './view/films-container.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmCardView from './view/film-card.js';
import FilmsExtraContainerView from './view/films-extra-container.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmDetailsView from './view/film-details.js';

import {generateFilmData} from './mock/films.js';
import {generateFilterData} from "./mock/filter.js";

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);

const films = getNewArray(FILMS_COUNT, generateFilmData);
const filters = generateFilterData(films);

renderElement(headerElement, new ProfileRatingView().getElement(), RenderPosition.BEFOREEND);

renderElement(mainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new FilmsSectionView().getElement(), RenderPosition.BEFOREEND);

const filmsSectionElement = mainElement.querySelector(`.films`);
renderElement(filmsSectionElement, new FilmsContainerView().getElement(), RenderPosition.AFTERBEGIN);
EXTRA_SECTION_TITLES.forEach((title) => renderElement(filmsSectionElement, new FilmsExtraContainerView(title).getElement(), RenderPosition.BEFOREEND));

const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);

let showingFilmsCount = FilmCardsShowCount.ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => renderElement(filmsContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

const showMoreButton = new ShowMoreButtonView();
renderElement(filmsListElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);

showMoreButton.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FilmCardsShowCount.BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderElement(filmsContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

  if (showingFilmsCount >= films.length) {
    showMoreButton.getElement().remove();
    showMoreButton.removeElement();
  }
});

const renderFilmDetails = () => {
  const filmDetails = new FilmDetailsView(films[0]);
  const filmDetailsCloseButton = filmDetails.getElement().querySelector(`.film-details__close-btn`);

  filmDetailsCloseButton.addEventListener(`click`, () => {
    filmDetails.getElement().remove();
    filmDetails.removeElement();
  });

  renderElement(bodyElement, filmDetails.getElement(), RenderPosition.BEFOREEND);
};

const [mostRatedContainer, mostCommentedContainer] = filmsSectionElement.querySelectorAll(`.films-list--extra .films-list__container`);

getSortedFilmsByRating(films).forEach((film) => renderElement(mostRatedContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));
getSortedFilmsByComments(films).forEach((film) => renderElement(mostCommentedContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

const filmsPosters = document.querySelectorAll(`.film-card__poster`);
filmsPosters.forEach((poster)=>{
  poster.addEventListener(`click`, renderFilmDetails);
});

renderElement(footerStatisticsElement, new FooterStatisticsView(films.length).getElement(), RenderPosition.BEFOREEND);


