const filmsToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isInWatchlist).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const createCountFilters = (films) => (
  Object.entries(filmsToFilterMap).map(([filterName, countFilms]) => (
    {
      name: filterName,
      count: countFilms(films)
    }
  ))
);

export const generateFilterData = (films) => ({
  filtersCount: createCountFilters(films)
});
