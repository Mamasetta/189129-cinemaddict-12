import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';

import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {generateId} from '../mock/films.js';
import {UPDATE_FILM, UpdateType} from "../constants.js";
import {EmojiType} from '../constants.js';

const ENTER_KEY = `Enter`;

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
    this._handleDeleteCommentButtonClick = this._handleDeleteCommentButtonClick.bind(this);
    this._handleEnterKeyDown = this._handleEnterKeyDown.bind(this);
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
    this._filmDetails.setDeleteCommentButtonClickHandler(this._handleDeleteCommentButtonClick);
    this._filmDetails.setEnterKeyDown(this._handleEnterKeyDown);
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
        document.removeEventListener(`keydown`, this._handleEnterKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);
    document.addEventListener(`keydown`, this._handleEnterKeyDown);

    render(this._bodyContainer, this._filmDetails, RenderPosition.BEFOREEND);
  }

  _handleWatchlistClick() {
    this._changeData(
        UPDATE_FILM,
        UpdateType.MINOR,
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
        UPDATE_FILM,
        UpdateType.MINOR,
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
        UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isHistory: !this._film.isHistory
            }
        )
    );
  }

  _handleDeleteCommentButtonClick(commentId) {
    const newComments = this._film.comments.filter((comment) => comment.id !== parseInt(commentId, 10));

    this._changeData(
        UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              comments: newComments
            }
        )
    );
  }

  _handleEnterKeyDown(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === ENTER_KEY) {
      const userComment = this._filmDetails.getUserComment();
      const selectedEmojiType = this._filmDetails.getSelectedEmojiType();

      if (userComment && selectedEmojiType) {
        const newComment = {
          id: generateId(),
          emoji: EmojiType[selectedEmojiType.toUpperCase()],
          date: new Date(),
          author: `Anonim`,
          description: userComment
        };

        const newComments = this._film.comments.slice();
        newComments.push(newComment);

        this._changeData(
            UPDATE_FILM,
            UpdateType.MINOR,
            Object.assign(
                {},
                this._film,
                {
                  comments: newComments
                }
            )
        );
      }
    }
  }
}
