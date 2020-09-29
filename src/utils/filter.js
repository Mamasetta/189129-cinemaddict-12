import {FilterType} from '../constants.js';

export const filtersData = {
  [FilterType.ALL_MOVIES]: (films) => films.slice(),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isHistory),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
