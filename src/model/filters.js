import Observer from '../utils/observer.js';
import {FilterType} from '../constants.js';

export default class Filters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL_MOVIES;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
