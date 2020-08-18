import {formatDate} from '../utils.js';
import {FILM_CARD_CONTROL_NAMES} from '../constants.js';

const createControlTemplate = (controls) => {
  return controls
    .map((control) => {
      return (
        `<button class="film-card__controls-item button film-card__controls-item--${control.name}">${control.text}</button>`
      );
    }).join(`\n`);
};

export const createFilmCardTemplate = (filmData) => {
  const {image, title, rating, releaseDate, runtime, genres, description, comments} = filmData;

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
        ${createControlTemplate(FILM_CARD_CONTROL_NAMES)};
      </form>
    </article>`
  );
};
