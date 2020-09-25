import {EXTRA_COUNT, EmojiType, FormatKey} from '../constants.js';
import moment from 'moment';

const formatRuntime = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const format = minutes > 60 ? `H[h] mm[m]` : `mm[m]`;
  return moment.utc(duration.as(`milliseconds`)).format(format).toString();
};

const formatDate = (date, formatKey) => {
  if (date instanceof Date && formatKey) {
    switch (formatKey) {
      case FormatKey.CARD:
        return moment(date).year();
      case FormatKey.DETAILS:
        return moment(date).format(`DD MMMM YYYY`);
      case FormatKey.COMMENT:
        return moment(date).fromNow();
    }
  }
  throw new Error(`incorrect data`);
};

const getSortedFilmsByRating = (sortingFilms) => sortingFilms.slice().sort((a, b) => b.rating - a.rating).slice(0, EXTRA_COUNT);

const getSortedFilmsByComments = (sortingFilms) => {
  const commentedFilms = sortingFilms.slice();
  const filmsWithoutComments = commentedFilms.filter((film) => film.comments === null);
  const filmsWithComments = commentedFilms.filter((film) => film.comments).sort((a, b) => b.comments.length - a.comments.length);
  const sortedFilms = filmsWithComments.concat(filmsWithoutComments);

  return sortedFilms.slice(0, EXTRA_COUNT);
};

const sortingByDate = (firstFilm, secondFilm) => secondFilm.releaseDate.getTime() - firstFilm.releaseDate.getTime();

const sortingByRating = (firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating;

const choosingEmoji = (emoji, variable) => {
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

export {
  formatRuntime,
  formatDate,
  getSortedFilmsByRating,
  getSortedFilmsByComments,
  sortingByDate,
  sortingByRating,
  choosingEmoji
};
