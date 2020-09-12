import {EXTRA_SECTION_TITLES, FilmCardsShowCount, SortingType} from '../constants.js';
import {getSortedFilmsByRating, getSortedFilmsByComments} from '../utils/film.js';

import SortingView from '../view/sorting.js';
import FilmsSectionView from '../view/films-section.js';
import FilmsListView from '../view/films-list.js';
import FilmsContainerView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardView from '../view/film-card.js';
import FilmsExtraContainerView from '../view/films-extra-container.js';
import FilmDetailsView from '../view/film-details.js';

import {RenderPosition, render} from '../utils/render.js';
import {sortingByDate, sortingByRating} from '../utils/film.js';

export default class MovieList {
  constructor(bodyContainer, mainContainer) {
    this._bodyContainer = bodyContainer;
    this._mainContainer = mainContainer;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();

    this._showingFilmsCount = FilmCardsShowCount.ON_START;
    this._currentSortType = SortingType.DEFAULT;
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderSorting();
    render(this._mainContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    if (films.length === 0) {
      this._showNoFilmsText();
    } else {
      EXTRA_SECTION_TITLES.forEach((title) => render(this._filmsSectionComponent, new FilmsExtraContainerView(title), RenderPosition.BEFOREEND));

      this._renderFilms(films);
      this._renderShowMoreButton(films);
      this._renderExtraFilms(films);
    }
  }

  _showNoFilmsText() {
    const filmsTitleElement = this._filmsListComponent.getElement().querySelector(`.films-list__title`);

    filmsTitleElement.classList.remove(`visually-hidden`);
    filmsTitleElement.textContent = `There are no movies in our database`;
  }

  _sortingFilms(sortingType) {
    switch (sortingType) {
      case SortingType.DATE:
        this._films.sort(sortingByDate);
        break;
      case SortingType.RATING:
        this._films.sort(sortingByRating);
        break;
      default:
        this._films = this._sourceFilms.slice();
    }

    this._currenSortingType = sortingType;
  }

  _handleSortingTypeChange(sortingType) {
    if (this._currenSortingType === sortingType) {
      return;
    } else {
      this._sortingFilms(sortingType);
      this._clearFilms();
      this._renderFilms();
    }
  }

  _renderSorting() {
    const sorting = new SortingView();
    render(this._mainContainer, sorting, RenderPosition.BEFOREEND);
    sorting.setSortingTypeChangeHandler(this._handleSortingTypeChange);
  }

  _clearFilms() {
    this._filmsContainerComponent.getElement().innerHTML = ``;
    this._showingFilmsCount = FilmCardsShowCount.ON_START;
  }

  _renderFilms(filmsData) {
    filmsData.slice(0, this._showingFilmsCount)
      .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film));
  }

  _renderShowMoreButton(filmsData) {
    const showMoreButton = new ShowMoreButtonView();
    render(this._filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FilmCardsShowCount.BY_BUTTON;

      filmsData.slice(prevFilmsCount, this._showingFilmsCount)
        .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film));

      if (this._showingFilmsCount >= filmsData.length) {
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
