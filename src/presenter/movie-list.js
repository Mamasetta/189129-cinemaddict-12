import {EXTRA_SECTION_TITLES, FilmCardsShowCount} from '../constants.js';
import {getSortedFilmsByRating, getSortedFilmsByComments} from '../utils/film.js';

import FilmsSectionView from '../view/films-section.js';
import FilmsListView from '../view/films-list.js';
import FilmsContainerView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardView from '../view/film-card.js';
import FilmsExtraContainerView from '../view/films-extra-container.js';
import FilmDetailsView from '../view/film-details.js';

import {RenderPosition, render} from '../utils/render.js';

let showingFilmsCount = FilmCardsShowCount.ON_START;

export default class MovieList {
  constructor(bodyContainer, mainContainer) {
    this._bodyContainer = bodyContainer;
    this._mainContainer = mainContainer;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmCardComponent = new FilmCardView();
    this._filmsExtraContainerComponent = new FilmsExtraContainerView();
    this._filmDetailsComponent = new FilmDetailsView();
  }

  init(films) {
    render(this._mainContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this.films = films.slice();

    if (films.length === 0) {
      const filmsTitleElement = this._filmsListComponent.getElement().querySelector(`.films-list__title`);

      filmsTitleElement.classList.remove(`visually-hidden`);
      filmsTitleElement.textContent = `There are no movies in our database`;
    } else {
      EXTRA_SECTION_TITLES.forEach((title) => render(this._filmsSectionComponent, new FilmsExtraContainerView(title), RenderPosition.BEFOREEND));

      films.slice(0, showingFilmsCount)
      .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film));

      this._renderShowMoreButton(films);
      this._renderExtraFilms(films);
    }
  }

  _renderShowMoreButton(filmsData) {
    const showMoreButton = new ShowMoreButtonView();
    render(this._filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + FilmCardsShowCount.BY_BUTTON;

      filmsData.slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film));

      if (showingFilmsCount >= filmsData.length) {
        showMoreButton.getElement().remove();
        showMoreButton.removeElement();
      }
    });
  }

  _renderFilmCard(containerElement, filmData) {
    const filmCard = new FilmCardView(filmData);

    filmCard.setFilmClickHandler(() => {
      this._renderFilmDetails(filmData);
    });

    render(containerElement, filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilmDetails(filmData) {
    const filmDetails = new FilmDetailsView(filmData);

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

    render(this._bodyContainer, filmDetails, RenderPosition.BEFOREEND);
  }

  _renderExtraFilms(filmsData) {
    const [mostRatedContainer, mostCommentedContainer] = this._filmsSectionComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`);

    getSortedFilmsByRating(filmsData).forEach((film) => this._renderFilmCard(mostRatedContainer, film));
    getSortedFilmsByComments(filmsData).forEach((film) => this._renderFilmCard(mostCommentedContainer, film));
  }
}
