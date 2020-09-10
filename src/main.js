import {FILMS_COUNT, EXTRA_SECTION_TITLES, FilmCardsShowCount} from './constants.js';
import {getSortedFilmsByRating, getSortedFilmsByComments} from './utils/film.js';
import {getNewArray} from './utils/common.js';
import {RenderPosition, render} from './utils/render.js';

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

render(headerElement, new ProfileRatingView(), RenderPosition.BEFOREEND);

render(mainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortingView(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsSectionView(), RenderPosition.BEFOREEND);

const filmsSectionElement = mainElement.querySelector(`.films`);
render(filmsSectionElement, new FilmsListView(), RenderPosition.AFTERBEGIN);

const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
render(filmsListElement, new FilmsContainerView(), RenderPosition.BEFOREEND);

const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

const renderFilmCard = (containerElement, filmData) => {
  const filmCard = new FilmCardView(filmData);
  const filmDetails = new FilmDetailsView(filmData);

  const renderFilmDetails = () => {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        filmDetails.getElement().remove();
        filmDetails.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmDetails.setCloseButtonClickHandler(() => {
      filmDetails.getElement().remove();
      filmDetails.removeElement();
    });

    document.addEventListener(`keydown`, onEscKeyDown);

    render(bodyElement, filmDetails, RenderPosition.BEFOREEND);
  };

  filmCard.setFilmClickHandler(() => {
    renderFilmDetails();
  });

  render(containerElement, filmCard, RenderPosition.BEFOREEND);
};

let showingFilmsCount = FilmCardsShowCount.ON_START;

if (films.length === 0) {
  const filmsTitleElement = filmsListElement.querySelector(`.films-list__title`);
  filmsTitleElement.classList.remove(`visually-hidden`);
  filmsTitleElement.textContent = `There are no movies in our database`;
} else {
  EXTRA_SECTION_TITLES.forEach((title) => render(filmsSectionElement, new FilmsExtraContainerView(title), RenderPosition.BEFOREEND));

  films.slice(0, showingFilmsCount)
  .forEach((film) => renderFilmCard(filmsContainerElement, film));

  const showMoreButton = new ShowMoreButtonView();
  render(filmsListElement, showMoreButton, RenderPosition.BEFOREEND);

  showMoreButton.setClickHandler(() => {
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

render(footerStatisticsElement, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);


