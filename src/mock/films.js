import {getRandomInteger, getRandomElement, getRandomElements, getRandomBoolean, getNewArray} from '../utils.js';
import {IMAGES, TITLES, NAMES, GENRES, COUNTRIES, DESCRIPTION_SENTENCES, EMOJIES, CommonValue, RuntimeValue, CommentsValue, FilmDataValue} from '../constants.js';

const getReleaseDate = () => {
  const releaseDate = new Date();

  return releaseDate;
};

const getRuntime = () => {
  const hours = getRandomInteger(RuntimeValue.HOURS_MIN, CommonValue.MAX);
  const minutes = getRandomInteger(CommonValue.MIN, RuntimeValue.MINUTES_MAX);

  return `${hours}h ${minutes}m`;
};

const getCommentDate = () => {
  const commentDate = new Date();

  const date = getRandomInteger(CommonValue.MIN, CommentsValue.DATE_MAX);
  const hours = getRandomInteger(CommonValue.MIN, CommentsValue.HOURS_MAX);
  const minutes = getRandomInteger(CommonValue.MIN, CommentsValue.MINUTES_MAX);
  commentDate.setDate(commentDate.getDate() + date);
  commentDate.setHours(commentDate.getHours() + hours);
  commentDate.setMinutes(commentDate.getMinutes() + minutes);

  return commentDate;
};

const generateCommentData = () => ({
  emoji: getRandomElement(EMOJIES),
  date: getCommentDate(),
  author: getRandomElement(NAMES),
  description: getRandomElements(DESCRIPTION_SENTENCES, CommentsValue.SENTENCE_MAX).join(` `)
});

export const generateFilmData = () => ({
  image: getRandomElement(IMAGES),
  title: getRandomElement(TITLES),
  rating: getRandomInteger(CommonValue.MIN, CommonValue.MAX),
  director: getRandomElement(NAMES),
  writers: getRandomElements(NAMES, getRandomInteger(FilmDataValue.MIN, CommonValue.MAX)).join(`, `),
  cast: getRandomElements(NAMES, getRandomInteger(FilmDataValue.MIN, CommonValue.MAX)).join(`, `),
  releaseDate: getReleaseDate(),
  runtime: getRuntime(),
  country: getRandomElement(COUNTRIES),
  genres: getRandomElements(GENRES, getRandomInteger(FilmDataValue.MIN, CommonValue.MAX)),
  description: getRandomElements(DESCRIPTION_SENTENCES, CommonValue.MAX).join(` `),
  comments: getNewArray(getRandomInteger(CommonValue.MIN, CommonValue.MAX), generateCommentData),
  ageRating: getRandomInteger(CommonValue.MIN, CommonValue.MAX),
  isWatchlist: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  isHistory: getRandomBoolean()
});
