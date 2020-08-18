import {getRandomInteger, getRandomElement, getRandomElements, getNewArray} from '../utils.js';
import {IMAGES, TITLES, NAMES, GENRES, COUNTRIES, DESCRIPTION_SENTENCES, EMOJIES} from '../constants.js';

const getReleaseDate = () => {
  const releaseDate = new Date();

  return releaseDate;
};

const getRuntime = () => {
  const hours = getRandomInteger(1, 5);
  const minutes = getRandomInteger(0, 60);

  return `${hours}h ${minutes}m`;
};

const getCommentDate = () => {
  const commentDate = new Date();

  const date = getRandomInteger(0, 7);
  const hours = getRandomInteger(0, 24);
  const minutes = getRandomInteger(0, 60);
  commentDate.setDate(commentDate.getDate() + date);
  commentDate.setHours(commentDate.getHours() + hours);
  commentDate.setMinutes(commentDate.getMinutes() + minutes);

  return commentDate;
};

const generateCommentData = () => {
  return {
    emoji: getRandomElement(EMOJIES),
    date: getCommentDate(),
    author: getRandomElement(NAMES),
    description: getRandomElements(DESCRIPTION_SENTENCES, 3).join(` `),
  };
};

const generateFilmData = () => {
  return {
    image: getRandomElement(IMAGES),
    title: getRandomElement(TITLES),
    rating: getRandomInteger(0, 10),
    director: getRandomElement(NAMES),
    writers: getRandomElements(NAMES, getRandomInteger(1, 5)).join(`, `),
    cast: getRandomElements(NAMES, getRandomInteger(1, 5)).join(`, `),
    releaseDate: getReleaseDate(),
    runtime: getRuntime(),
    country: getRandomElement(COUNTRIES),
    genres: getRandomElements(GENRES, getRandomInteger(1, 5)),
    description: getRandomElements(DESCRIPTION_SENTENCES, 5).join(` `),
    comments: getNewArray(getRandomInteger(1, 5), generateCommentData),
    ageRating: getRandomInteger(0, 18),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1))
  };
};

export const films = getNewArray(20, generateFilmData);
