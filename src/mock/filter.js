const EXTRA_COUNT = 2;

const filmsToFilterMap = {
  whatchlist: (films) => films
    .filter((film) => !film.isHistory)
    .filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const sortByRating = (films) => (
  [films.sort((a, b) => b.rating - a.rating).slice(0, EXTRA_COUNT)]
);

const sortByComments = (films) => {
  const filmsWithoutComments = films.filter((film) => film.comments === null);
  const filmsWithComments = films.filter((film) => film.comments).sort((a, b) => b.comments.length - a.comments.length);
  const sortedFilms = filmsWithComments.concat(filmsWithoutComments);

  return [sortedFilms.slice(0, EXTRA_COUNT)];
};

const createCountFilters = (films) => (
  Object.entries(filmsToFilterMap).map(([filterName, countFilms]) => (
    {
      name: filterName,
      count: countFilms(films)
    }
  ))
);

export const generateFilterData = (films) => {
  return {
    filtersCount: createCountFilters(films),
    filtersRating: sortByRating(films),
    filtersComments: sortByComments(films)
  };
};
