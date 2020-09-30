import Observer from '../utils/observer.js';
import {FilterType} from '../constants.js';

export default class Filters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL_MOVIES;
  }

  set(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get() {
    return this._activeFilter;
  }
}
