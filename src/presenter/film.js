import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';

import {RenderPosition, render, replace, remove} from '../utils/render.js';

export default class Film {
  constructor(container, bodyContainer, changeData) {
    this._container = container;
    this._bodyContainer = bodyContainer;
    this._changeData = changeData;

    this._filmCard = null;

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

    this._filmCard.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCard.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCard.setHistoryClickHandler(this._handleHistoryClick);

    this._filmDetails.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetails.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetails.setHistoryClickHandler(this._handleHistoryClick);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmDetails);
  }

  _renderFilmCard(containerElement) {
    this._filmCard.setFilmClickHandler(() => {
      this._renderFilmDetails();
    });

    render(containerElement, this._filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilmDetails() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._filmDetails.getElement().remove();
        this._filmDetails.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmDetails.setCloseButtonClickHandler(() => {
      this._filmDetails.getElement().remove();
      this._filmDetails.removeElement();
    });

    document.addEventListener(`keydown`, onEscKeyDown);

    render(this._bodyContainer, this._filmDetails, RenderPosition.BEFOREEND);
  }

  _handleWatchlistClick() {
    this._changeData(
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
