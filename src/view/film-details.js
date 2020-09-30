import SmartView from './smart.js';
import {formatRuntime, formatDate} from '../utils/film.js';
import {EMOJIES, EmojiType, FormatKey} from '../constants.js';
import he from 'he';

const choosingEmoji = (emoji) => {
  let variable = null;

  switch (emoji) {
    case EmojiType.SMILE:
      variable = EmojiType.SMILE;
      break;
    case EmojiType.ANGRY:
      variable = EmojiType.ANGRY;
      break;
    case EmojiType.SLEEPING:
      variable = EmojiType.SLEEPING;
      break;
    case EmojiType.PUKE:
      variable = EmojiType.PUKE;
      break;
  }

  return variable;
};

const getCheckedAttribute = (control) => control ? `checked` : ``;

const createGenreTemplate = (genre) =>
  `<span class="film-details__genre">${genre}</span>`;

const createCommentTemplate = ({id, emotion, comment, author, date}) => {
  const commentDateView = formatDate(date, FormatKey.COMMENT);

  return (
    `<li class="film-details__comment" data-comment-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDateView}</span>
          <button class="film-details__comment-delete" data-comment-id ="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const getSelectedEmoji = (emoji) => {
  const image = choosingEmoji(emoji);

  return `<img src="images/emoji/${image}.png" width="55" height="55" alt="emoji">`;
};
const createChoosingEmojiTemplate = (emojies) => {
  return emojies
    .map((emoji) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji" data-emoji-type="${emoji}">
        </label>`
      );
    }).join(`\n`);
};

const createFilmDetailsTemplate = (filmData, filmsComments) => {
  const {id, image, title, fullTitle, rating, director, writers, cast, releaseDate, runtime, country, genres, description, comments, ageRating, isInWatchlist, isFavorite, isHistory} = filmData;

  const releaseDateVeiw = formatDate(releaseDate, FormatKey.DETAILS);
  const runtimeView = formatRuntime(runtime);
  const genresTitle = genres.length > 1 ? `Genres` : `Genre`;
  const genresTemplate = genres.map((it) => createGenreTemplate(it)).join(`\n`);
  const commentsTemplate = filmsComments.map((it) => createCommentTemplate(it)).join(`\n`);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get" data-film-id="${id}">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${image}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${fullTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${cast}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDateVeiw}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtimeView}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresTitle}</td>
                  <td class="film-details__cell">
                    ${genresTemplate}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getCheckedAttribute(isInWatchlist)}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getCheckedAttribute(isHistory)}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getCheckedAttribute(isFavorite)}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsTemplate}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${createChoosingEmojiTemplate(EMOJIES)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends SmartView {
  constructor(filmData, comments) {
    super();
    this._filmData = filmData;
    this._emoji = null;
    this._comment = null;
    this._filmsComments = comments;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._deleteCommentButtonClickHandler = this._deleteCommentButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmData, this._emoji, this._comment, this._filmsComments);
  }

  setInnerHandlers() {
    this.setEmojiClickHandler();
    this.setCommentInputHandler();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
  }

  restoreHandlers() {
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setHistoryClickHandler(this._callback.historyClick);
    this.setDeleteCommentButtonClickHandler(this._callback.deleteCommentButtonClick);
    this.setInnerHandlers();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }
  setEnterKeyDown(callback) {
    this._callback.enterKeyDown = callback;
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._historyClickHandler);
  }

  setEmojiClickHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((element) => element.addEventListener(`click`, this._emojiClickHandler));
  }

  setCommentInputHandler() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentInputHandler);
  }

  setDeleteCommentButtonClickHandler(callback) {
    this._callback.deleteCommentButtonClick = callback;
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((element) => element.addEventListener(`click`, this._deleteCommentButtonClickHandler));
  }

  getSelectedEmojiType() {
    return this._emoji ? this._emoji : false;
  }

  getUserComment() {
    return this._comment ? this._comment : false;
  }

  setFilmComments(comments) {
    this._filmsComments = comments;
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this.getElement().remove();
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

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this._updateEmoji(evt.target.dataset.emojiType);
    this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = getSelectedEmoji(evt.target.dataset.emojiType);
  }

  _updateEmoji(emoji) {
    this._emoji = choosingEmoji(emoji);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this._comment = evt.target.value;
  }

  _deleteCommentButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteCommentButtonClick(evt.target.dataset.commentId);
  }
}
