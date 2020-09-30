const EXTRA_COUNT = 2;

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

const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`
}

const UpdateType = {
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const FilterType = {
  ALL_MOVIES: `all movies`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const StatisticsFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export {
  EXTRA_COUNT,
  EMOJIES,
  EmojiType,
  ExtraSectionTitle,
  FilmCardsShowCount,
  RenderPosition,
  SortingType,
  FormatKey,
  UserAction,
  UpdateType,
  FilterType,
  StatisticsFilter
};
