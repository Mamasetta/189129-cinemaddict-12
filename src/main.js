import {FILMS_COUNT, EXTRA_SECTION_TITLES, FilmCardsShowCount} from './constants.js';
import {getNewArray, renderElement, RenderPosition, getSortedFilmsByRating, getSortedFilmsByComments} from './utils.js';

import ProfileRatingView from './view/profile-rating.js';
import MainNavigationView from './view/main-navigation.js';
import SortingView from './view/sorting.js';
import FilmsSectionView from './view/films-section.js';
import FilmsListView from './view/films-list.js';
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
renderElement(filmsSectionElement, new FilmsListView().getElement(), RenderPosition.AFTERBEGIN);

const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
renderElement(filmsListElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);

const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

const renderFilmCard = (containerElement, filmData) => {
  const filmCard = new FilmCardView(filmData);
  const filmDetails = new FilmDetailsView(filmData);

  const renderFilmDetails = () => {
    const filmDetailsCloseButton = filmDetails.getElement().querySelector(`.film-details__close-btn`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        filmDetails.getElement().remove();
        filmDetails.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmDetailsCloseButton.addEventListener(`click`, () => {
      filmDetails.getElement().remove();
      filmDetails.removeElement();
    });

    document.addEventListener(`keydown`, onEscKeyDown);

    renderElement(bodyElement, filmDetails.getElement(), RenderPosition.BEFOREEND);
  };

  filmCard.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    renderFilmDetails();
  });

  renderElement(containerElement, filmCard.getElement(), RenderPosition.BEFOREEND);
};

let showingFilmsCount = FilmCardsShowCount.ON_START;

if (!showingFilmsCount) {
  const filmsTitleElement = filmsListElement.querySelector(`.films-list__title`);
  filmsTitleElement.classList.remove(`visually-hidden`);
  filmsTitleElement.textContent = `There are no movies in our database`;
} else {
  EXTRA_SECTION_TITLES.forEach((title) => renderElement(filmsSectionElement, new FilmsExtraContainerView(title).getElement(), RenderPosition.BEFOREEND));

  films.slice(0, showingFilmsCount)
  .forEach((film) => renderFilmCard(filmsContainerElement, film));

  const showMoreButton = new ShowMoreButtonView();
  renderElement(filmsListElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FilmCardsShowCount.BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilmCard(filmsContainerElement, film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });

  const [mostRatedContainer, mostCommentedContainer] = filmsSectionElement.querySelectorAll(`.films-list--extra .films-list__container`);

  getSortedFilmsByRating(films).forEach((film) => renderFilmCard(mostRatedContainer, film));
  getSortedFilmsByComments(films).forEach((film) => renderFilmCard(mostCommentedContainer, film));
}

renderElement(footerStatisticsElement, new FooterStatisticsView(films.length).getElement(), RenderPosition.BEFOREEND);


