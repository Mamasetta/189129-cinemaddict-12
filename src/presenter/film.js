import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';

import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {UPDATE_FILM, UpdateType} from "../constants.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Film {
  constructor(container, bodyContainer, changeData, changeMode) {
    this._container = container;
    this._bodyContainer = bodyContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCard = null;
    this._mode = Mode.DEFAULT;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDetails = this._filmDetails;

    this._filmCard = new FilmCardView(film);
    this._filmDetails = new FilmDetailsView(film);

    this._filmCard.setFilmClickHandler(() => {
      this._changeMode();
      this._renderFilmDetails();
      this._mode = Mode.EDITING;
    });

    this._filmCard.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCard.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCard.setHistoryClickHandler(this._handleHistoryClick);

    this._filmDetails.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetails.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetails.setHistoryClickHandler(this._handleHistoryClick);
    this._filmDetails.setInnerHandlers();

    if (prevFilmCard === null || prevFilmDetails === null) {
      this._renderFilmCard(this._container, this._film);
      return;
    }

    if (this._container.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    if (this._bodyContainer.contains(prevFilmDetails.getElement())) {
      replace(this._filmDetails, prevFilmDetails);
    }

    remove(prevFilmCard);
    remove(prevFilmDetails);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmDetails);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._filmDetails.getElement().remove();
    }
  }

  _renderFilmCard(containerElement) {
    render(containerElement, this._filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilmDetails() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._filmDetails.getElement().remove();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    render(this._bodyContainer, this._filmDetails, RenderPosition.BEFOREEND);
  }

  _handleWatchlistClick() {
    this._changeData(
        UPDATE_FILM, UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UPDATE_FILM, UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleHistoryClick() {
    this._changeData(
        UPDATE_FILM, UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isHistory: !this._film.isHistory
            }
        )
    );
  }
}
