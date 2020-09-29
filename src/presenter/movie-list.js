import {UserAction, ExtraSectionTitle, FilmCardsShowCount, SortingType, UpdateType} from '../constants.js';
import {getSortedFilmsByRating, getSortedFilmsByComments, sortingByDate, sortingByRating} from '../utils/film.js';
import {RenderPosition, render, remove} from '../utils/render.js';

import SortingView from '../view/sorting.js';
import FilmsSectionView from '../view/films-section.js';
import FilmsListView from '../view/films-list.js';
import FilmsContainerView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmsExtraContainerView from '../view/films-extra-container.js';

import FilmPresenter from './film.js';

import {filtersData} from '../utils/filter.js';

export default class MovieList {
  constructor(bodyContainer, mainContainer, moviesModel, filtersModel) {
    this._moviesModel = moviesModel;
    this._filtersModel = filtersModel;

    this._bodyContainer = bodyContainer;
    this._mainContainer = mainContainer;

    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._sortingComponent = new SortingView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._mostRatedListComponent = new FilmsExtraContainerView(ExtraSectionTitle.TOP_RATED);
    this._mostCommentedListComponent = new FilmsExtraContainerView(ExtraSectionTitle.MOST_COMMENTED);

    this._showingFilmsCount = FilmCardsShowCount.ON_START;
    this._currentSortingType = SortingType.DEFAULT;

    this._filmPresenter = {};
    this._mostRatedFilmPresenter = {};
    this._mostCommentedFilmPresenter = {};

    this._handleSortingTypeChange = this._handleSortingTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsList();
  }

  hideFilmsSection() {
    this._filmsSectionComponent.getElement().classList.add(`visually-hidden`);
    this._sortingComponent.getElement().classList.add(`visually-hidden`);
  }

  showFilmsSection() {
    this._filmsSectionComponent.getElement().classList.remove(`visually-hidden`);
    this._sortingComponent.getElement().classList.remove(`visually-hidden`);
    this._handleSortingTypeChange(SortingType.DEFAULT);
  }

  resetFilmsSection() {
    this._clearFilmsList({resetRenderedFilmsCount: true});
    this._renderFilmsList();
  }

  _renderFilmsList() {
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
    const filterType = this._filtersModel.getFilter();
    const films = this._moviesModel.getFilms();
    const filteredFilms = filtersData[filterType](films);

    switch (this._currentSortingType) {
      case SortingType.DATE:
        return filteredFilms.sort(sortingByDate);
      case SortingType.RATING:
        return filteredFilms.sort(sortingByRating);
    }

    return filteredFilms;
  }

  _handleSortingTypeChange(sortingType) {
    if (this._currentSortingType === sortingType) {
      return;
    } else {
      this._currentSortingType = sortingType;
      this._clearFilmsList();
      this._renderFilmsList();
    }
  }

  _renderSorting() {
    render(this._mainContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortingTypeChangeHandler(this._handleSortingTypeChange);
  }

  _renderFilms() {
    this._getFilms().slice(0, this._showingFilmsCount)
      .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film, this._filmPresenter));
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FilmCardsShowCount.BY_BUTTON;

      this._getFilms().slice(prevFilmsCount, this._showingFilmsCount)
        .forEach((film) => this._renderFilmCard(this._filmsContainerComponent, film, this._filmPresenter));

      if (this._showingFilmsCount >= this._getFilms().length) {
        this._showMoreButtonComponent.getElement().remove();
        this._showMoreButtonComponent.removeElement();
      }
    });
  }

  _renderFilmCard(container, film, presenterStore) {
    const filmPresenter = new FilmPresenter(container, this._bodyContainer, this._handleViewAction, this._handleModeChange);

    filmPresenter.init(film);
    presenterStore[film.id] = filmPresenter;
  }

  _renderMostRatedFilms() {
    render(this._filmsSectionComponent, this._mostRatedListComponent, RenderPosition.BEFOREEND);

    const mostRatedContainer = new FilmsContainerView();
    render(this._mostRatedListComponent, mostRatedContainer, RenderPosition.BEFOREEND);

    getSortedFilmsByRating(this._getFilms()).forEach((film) => this._renderFilmCard(mostRatedContainer, film, this._mostRatedFilmPresenter));
  }

  _renderMostCommentedFilms() {
    render(this._filmsSectionComponent, this._mostCommentedListComponent, RenderPosition.BEFOREEND);

    const mostCommentedContainer = new FilmsContainerView();
    render(this._mostCommentedListComponent, mostCommentedContainer, RenderPosition.BEFOREEND);

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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, updatedFilm) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._handleFilmChange(updatedFilm);
        break;
      case UpdateType.MAJOR:
        this._clearFilmsList({resetRenderedFilmsCount: true, resetSortingType: true});
        this._renderFilmsList();
        break;
    }
  }

  _clearFilmsList({resetRenderedFilmsCount = false, resetSortingType = false} = {}) {
    [
      ...Object.values(this._filmPresenter),
      ...Object.values(this._mostCommentedFilmPresenter),
      ...Object.values(this._mostRatedFilmPresenter)
    ].forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};
    this._mostCommentedFilmPresenter = {};
    this._mostRatedFilmPresenter = {};

    remove(this._sortingComponent);
    remove(this._showMoreButtonComponent);
    remove(this._mostRatedListComponent);
    remove(this._mostCommentedListComponent);

    if (resetRenderedFilmsCount) {
      this._showingFilmsCount = FilmCardsShowCount.ON_START;
    }

    if (resetSortingType) {
      this._currentSortingType = SortingType.DEFAULT;
    }
  }
}
