import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set(films) {
    this._films = films.slice();
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
}
