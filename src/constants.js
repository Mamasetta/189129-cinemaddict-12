const RATING_MAX = 10;
const EXTRA_COUNT = 2;
const FILMS_COUNT = 20;
const FILMS_DATA_MIN = 1;
const COMMENTS_SENTENCE_COUNT = 3;
const RUNTIME_MAX = 180;

const IMAGES = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const TITLES = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa Claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

const NAMES = [
  `Heinz Herald`,
  `Dan Duryea`,
  `Anthony Mann`,
  `Erich von Stroheim`,
  `Anne Wigton`,
  `Richard Weil`,
  `Mary Beth Hughes`
];

const GENRES = [
  `Drama`,
  `Horror`,
  `Triller`,
  `Trash`,
  `Road movie`,
  `Film-Noir`,
  `Mystery`
];

const COUNTRIES = [
  `USA`,
  `Thailand`,
  `France`,
  `Brasil`,
  `Peru`,
  `Argentina`,
  `Italy`,
  `German`
];

const DESCRIPTION_SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const EMOJIES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

const ExtraSectionTitle = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

const FilmCardsShowCount = {
  ON_START: 5,
  BY_BUTTON: 5
};

const CommonValue = {
  MIN: 0,
  MAX: 5
};

const DateValue = {
  DATE_MAX: 7,
  HOURS_MAX: 24,
  MINUTES_MAX: 60
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const SortingType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const FormatKey = {
  CARD: `card`,
  DETAILS: `details`,
  COMMENT: `comment`
};

export {
  RATING_MAX,
  EXTRA_COUNT,
  FILMS_COUNT,
  FILMS_DATA_MIN,
  COMMENTS_SENTENCE_COUNT,
  RUNTIME_MAX,
  IMAGES,
  TITLES,
  NAMES,
  GENRES,
  COUNTRIES,
  DESCRIPTION_SENTENCES,
  EMOJIES,
  EmojiType,
  ExtraSectionTitle,
  FilmCardsShowCount,
  CommonValue,
  DateValue,
  RenderPosition,
  SortingType,
  FormatKey
};
