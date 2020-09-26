import {ExtraSectionTitle, FilmCardsShowCount, SortingType} from '../constants.js';
import {getSortedFilmsByRating, getSortedFilmsByComments, sortingByDate, sortingByRating} from '../utils/film.js';
import {RenderPosition, render} from '../utils/render.js';

import SortingView from '../view/sorting.js';
import FilmsSectionView from '../view/films-section.js';
import FilmsListView from '../view/films-list.js';
import FilmsContainerView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmsExtraContainerView from '../view/films-extra-container.js';

import FilmPresenter from './film.js';

export default class MovieList {
  constructor(bodyContainer, mainContainer, moviesModel) {
    this._moviesModel = moviesModel;
    this._bodyContainer = bodyContainer;
    this._mainContainer = mainContainer;

    this._films = null;
    this._sourcedFilms = null;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();

    this._showingFilmsCount = FilmCardsShowCount.ON_START;
    this._currentSortingType = SortingType.DEFAULT;
    this._filmPresenter = {};
    this._mostRatedFilmPresenter = {};
    this._mostCommentedFilmPresenter = {};

    this._handleSortingTypeChange = this._handleSortingTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._renderSorting();
    render(this._mainContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    if (this._getFilms().length === 0) {
      this._showNoFilmsText();
    } else {
      this._renderFilms();
      this._renderShowMoreButton();
      this._renderMostRatedFilms();
      this._renderMostCommentedFilms();
    }
  }

  _showNoFilmsText() {
    const filmsTitleElement = this._filmsListComponent.getElement().querySelector(`.films-list__title`);

    filmsTitleElement.classList.remove(`visually-hidden`);
    filmsTitleElement.textContent = `There are no movies in our database`;
  }

  _getFilms() {
    switch (this._currentSortingType) {
      case SortingType.DATE:
        return this._moviesModel.getFilms().slice().sort(sortingByDate);
      case SortingType.RATING:
        return this._moviesModel.getFilms().slice().sort(sortingByRating);
    }

    return this._moviesModel.getFilms();
  }

  _handleSortingTypeChange(sortingType) {
    if (this._currentSortingType === sortingType) {
      return;
    } else {
      this._currentSortingType = sortingType;
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
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._showingFilmsCount = FilmCardsShowCount.ON_START;
  }

  _renderFilms() {
    this._getFilms().slice(0, this._showingFilmsCount)
      .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film, this._filmPresenter));
  }

  _renderShowMoreButton() {
    const showMoreButton = new ShowMoreButtonView();
    render(this._filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FilmCardsShowCount.BY_BUTTON;

      this._getFilms().slice(prevFilmsCount, this._showingFilmsCount)
        .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film, this._filmPresenter));

      if (this._showingFilmsCount >= this._getFilms().length) {
        showMoreButton.getElement().remove();
        showMoreButton.removeElement();
      }
    });
  }

  _renderFilmCard(container, film, presenterStore) {
    const filmPresenter = new FilmPresenter(container, this._bodyContainer, this._handleFilmChange, this._handleModeChange);

    filmPresenter.init(film);
    presenterStore[film.id] = filmPresenter;
  }

  _renderMostRatedFilms() {
    const mostRatedList = new FilmsExtraContainerView(ExtraSectionTitle.TOP_RATED);
    render(this._filmsSectionComponent, mostRatedList, RenderPosition.BEFOREEND);

    const mostRatedContainer = new FilmsContainerView();
    render(mostRatedList, mostRatedContainer, RenderPosition.BEFOREEND);

    getSortedFilmsByRating(this._getFilms()).forEach((film) => this._renderFilmCard(mostRatedContainer, film, this._mostRatedFilmPresenter));
  }

  _renderMostCommentedFilms() {
    const mostCommentedList = new FilmsExtraContainerView(ExtraSectionTitle.MOST_COMMENTED);
    render(this._filmsSectionComponent, mostCommentedList, RenderPosition.BEFOREEND);

    const mostCommentedContainer = new FilmsContainerView();
    render(mostCommentedList, mostCommentedContainer, RenderPosition.BEFOREEND);

    getSortedFilmsByComments(this._getFilms()).forEach((film) => this._renderFilmCard(mostCommentedContainer, film, this._mostCommentedFilmPresenter));
  }

  _handleModeChange() {
    [
      ...Object.values(this._filmPresenter),
      ...Object.values(this._mostCommentedFilmPresenter),
      ...Object.values(this._mostRatedFilmPresenter)
    ].forEach((presenter) => presenter.resetView());
  }

  _initFilm(presenterStore, film) {
    presenterStore[film.id].init(film);
  }

  _handleFilmChange(updatedFilm) {
    if (this._filmPresenter[updatedFilm.id]) {
      this._initFilm(this._filmPresenter, updatedFilm);
    }

    if (this._mostRatedFilmPresenter[updatedFilm.id]) {
      this._initFilm(this._mostRatedFilmPresenter, updatedFilm);
    }

    if (this._mostCommentedFilmPresenter[updatedFilm.id]) {
      this._initFilm(this._mostCommentedFilmPresenter, updatedFilm);
    }
  }
}
