import {MONTH_NAMES, EXTRA_COUNT} from './constants.js';

const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomElement = (elements) => {
  const randomElement = elements[getRandomInteger(0, elements.length - 1)];

  return randomElement;
};

const getRandomElements = (elements, maxLenght) => {
  const length = getRandomInteger(1, maxLenght);
  const randomElements = [];
  for (let i = 0; i < length; i++) {
    randomElements.push(elements[i]);
  }

  return randomElements;
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const getNewArray = (count, action) => new Array(count).fill(``).map(action);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

const formatDate = (date) => {
  const year = String(date.getFullYear());

  return `${year}`;
};

const formatFullDate = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = MONTH_NAMES[String(date.getMonth())];
  const year = String(date.getFullYear());

  return `${day} ${month} ${year}`;
};

const formatCommentDate = (date) => {
  const year = String(date.getFullYear());
  const month = castTimeFormat(date.getMonth() + 1);
  const day = castTimeFormat(date.getDate());
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeFormat(date.getMinutes());

  return `${year}/${month}/${day}  ${hours}:${minutes}`;
};

const getSortedFilmsByRating = (sortingFilms) => sortingFilms.slice().sort((a, b) => b.rating - a.rating).slice(0, EXTRA_COUNT);

const getSortedFilmsByComments = (sortingFilms) => {
  const commentedFilms = sortingFilms.slice();
  const filmsWithoutComments = commentedFilms.filter((film) => film.comments === null);
  const filmsWithComments = commentedFilms.filter((film) => film.comments).sort((a, b) => b.comments.length - a.comments.length);
  const sortedFilms = filmsWithComments.concat(filmsWithoutComments);

  return sortedFilms.slice(0, EXTRA_COUNT);
};

export {
  getRandomInteger,
  getRandomElement,
  getRandomElements,
  getRandomBoolean,
  getNewArray,
  render,
  formatDate,
  formatFullDate,
  formatCommentDate,
  getSortedFilmsByRating,
  getSortedFilmsByComments
};
