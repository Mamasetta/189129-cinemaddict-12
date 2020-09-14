import {getRandomInteger, getRandomElement, getRandomElements, getRandomBoolean, getNewArray} from '../utils/common.js';
import {RATING_MAX, FILMS_DATA_MIN, COMMENTS_SENTENCE_COUNT, IMAGES, TITLES, NAMES, GENRES, COUNTRIES, DESCRIPTION_SENTENCES, EMOJIES, CommonValue, RuntimeValue, DateValue} from '../constants.js';

const getReleaseDate = () => {
  const releaseDate = new Date();

  const date = getRandomInteger(CommonValue.MIN, DateValue.DATE_MAX);
  const hours = getRandomInteger(CommonValue.MIN, DateValue.HOURS_MAX);
  const minutes = getRandomInteger(CommonValue.MIN, DateValue.MINUTES_MAX);
  releaseDate.setDate(releaseDate.getDate() + date);
  releaseDate.setHours(releaseDate.getHours() + hours);
  releaseDate.setMinutes(releaseDate.getMinutes() + minutes);

  return releaseDate;
};

const getRuntime = () => {
  const hours = getRandomInteger(RuntimeValue.HOURS_MIN, CommonValue.MAX);
  const minutes = getRandomInteger(CommonValue.MIN, RuntimeValue.MINUTES_MAX);

  return `${hours}h ${minutes}m`;
};

const getCommentDate = () => {
  const commentDate = new Date();

  const date = getRandomInteger(CommonValue.MIN, DateValue.DATE_MAX);
  const hours = getRandomInteger(CommonValue.MIN, DateValue.HOURS_MAX);
  const minutes = getRandomInteger(CommonValue.MIN, DateValue.MINUTES_MAX);
  commentDate.setDate(commentDate.getDate() + date);
  commentDate.setHours(commentDate.getHours() + hours);
  commentDate.setMinutes(commentDate.getMinutes() + minutes);

  return commentDate;
};

const generateCommentData = () => ({
  emoji: getRandomElement(EMOJIES),
  date: getCommentDate(),
  author: getRandomElement(NAMES),
  description: getRandomElements(DESCRIPTION_SENTENCES, COMMENTS_SENTENCE_COUNT).join(` `)
});

export const generateFilmData = () => ({
  image: getRandomElement(IMAGES),
  title: getRandomElement(TITLES),
  rating: getRandomInteger(CommonValue.MIN, RATING_MAX),
  director: getRandomElement(NAMES),
  writers: getRandomElements(NAMES, getRandomInteger(FILMS_DATA_MIN, CommonValue.MAX)).join(`, `),
  cast: getRandomElements(NAMES, getRandomInteger(FILMS_DATA_MIN, CommonValue.MAX)).join(`, `),
  releaseDate: getReleaseDate(),
  runtime: getRuntime(),
  country: getRandomElement(COUNTRIES),
  genres: getRandomElements(GENRES, getRandomInteger(FILMS_DATA_MIN, CommonValue.MAX)),
  description: getRandomElements(DESCRIPTION_SENTENCES, CommonValue.MAX).join(` `),
  comments: getNewArray(getRandomInteger(CommonValue.MIN, CommonValue.MAX), generateCommentData),
  ageRating: getRandomInteger(CommonValue.MIN, CommonValue.MAX),
  isInWatchlist: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  isHistory: getRandomBoolean()
});
