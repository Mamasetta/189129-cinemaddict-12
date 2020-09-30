import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set(updateType, films) {
    this._films = films.slice();
    this._notify(updateType);
  }

  get() {
    return this._films;
  }

  update(updateType, updatedFilm) {
    const index = this._films.findIndex((film) => film.id === updatedFilm.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      updatedFilm,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, updatedFilm);
  }

  static adaptToClient(film) {
    return Object.assign({}, film, {
      image: film.film_info.poster,
      title: film.film_info.title,
      fullTitle: film.film_info.alternative_title,
      rating: film.film_info.total_rating,
      director: film.film_info.director,
      writers: film.film_info.writers,
      cast: film.film_info.actors,
      releaseDate: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
      runtime: film.film_info.runtime,
      country: film.film_info.release.release_country,
      genres: film.film_info.genre,
      description: film.film_info.description,
      ageRating: film.film_info.age_rating,
      isInWatchlist: film.user_details.already_watched,
      isFavorite: film.user_details.favorite,
      isHistory: film.user_details.watchlist,
      watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date
    });
  }

  static adaptToServer(film) {
    return Object.assign({}, film, {
      "film_info": {
        "poster": film.image,
        "title": film.title,
        "alternative_title": film.fullTitle,
        "total_rating": film.rating,
        "director": film.director,
        "writers": film.writers,
        "actors": film.cast,
        "release": {
          "date": film.releaseDate instanceof Date ? film.releaseDate.toISOString() : null,
          "release_country": film.country,
        },
        "runtime": film.runtime,
        "genre": film.genres,
        "description": film.description,
        "age_rating": film.ageRating,
      },
      "user_details": {
        "already_watched": film.isHistory,
        "watchlist": film.isInWatchlist,
        "favorite": film.isFavorite,
        "watching_date": film.watchingDate instanceof Date ? film.status.watchingDate.toISOString() : null,
      }
    });
  }

}
