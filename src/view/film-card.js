import AbstractView from './abstract.js';
import {formatDate} from '../utils/film.js';

const getActiveClass = (control) => control ? `film-card__controls-item--active` : ``;

const createFilmCardTemplate = (filmData) => {
  const {image, title, rating, releaseDate, runtime, genres, description, comments, isInWatchlist, isFavorite, isHistory} = filmData;

  const releaseDateView = formatDate(releaseDate);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDateView}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres.join(`, `)}</span>
      </p>
      <img src="./images/posters/${image}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveClass(isInWatchlist)}">
        Add to watchlist
        </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${getActiveClass(isHistory)}">
          Mark as watched
        </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite  ${getActiveClass(isFavorite)}">
          Mark as favorite
        </button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmData);
  }

  setFilmClickHandler(callback) {
    this._callback.filmClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._filmClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._filmClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._filmClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._historyClickHandler);
  }

  _filmClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }
}
