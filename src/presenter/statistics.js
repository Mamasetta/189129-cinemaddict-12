import StatisticsView from '../view/statistics.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import moment from 'moment';
import {FilterType, StatisticsFilter} from '../constants.js';
import {filtersData} from "../utils/filter.js";

const MomentSetting = {
  DAY: `day`,
  DAYS: `days`,
  MONTH: `month`,
  YEAR: `year`
};

export default class Statistics {
  constructor(container, moviesModel) {
    this._container = container;
    this._statisticsComponent = null;
    this._moviesModel = moviesModel;
    this._statisticsFilter = StatisticsFilter;
    this._currentStatisticsType = StatisticsFilter.ALL_TIME;
    this._statisticsChangeHandler = this._statisticsChangeHandler.bind(this);
  }
  init() {
    this._statisticsComponent = new StatisticsView(this._getStatisticsDataFilms(this._moviesModel.get(), this._currentStatisticsType), this._statisticsFilter, this._currentStatisticsType);
    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.setStatisticsChangeHandler(this._statisticsChangeHandler);
  }

  remove() {
    remove(this._statisticsComponent);
  }

  _statisticsChangeHandler(statisticsValue) {
    remove(this._statisticsComponent);
    this._currentStatisticsType = statisticsValue;
    this._renderStatistics();
  }

  _renderStatistics() {
    this._statisticsComponent = new StatisticsView(this._getStatisticsDataFilms(this._moviesModel.get(), this._currentStatisticsType), this._statisticsFilter, this._currentStatisticsType);
    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.setStatisticsChangeHandler(this._statisticsChangeHandler);
  }

  _choosingStatisticsFilter(statisticsFilter, statisticsData, films) {
    let watchedFilms = null;
    const currentDate = moment();
    const dateAWeekAgo = moment().subtract(7, MomentSetting.DAYS);
    const dateAMonthAgo = moment().subtract(1, MomentSetting.MONTH);
    const dateAYearAgo = moment().subtract(1, MomentSetting.YEAR);

    switch (statisticsFilter) {
      case StatisticsFilter.ALL_TIME:
        watchedFilms = filtersData[FilterType.HISTORY](films);
        statisticsData.watchedCount = watchedFilms.length;
        watchedFilms = films.filter((film) => film.watchingDate !== null);
        break;
      case StatisticsFilter.TODAY:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDate).isSame(currentDate, MomentSetting.DAY)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticsFilter.WEEK:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDate).isBetween(dateAWeekAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticsFilter.MONTH:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDate).isBetween(dateAMonthAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticsFilter.YEAR:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDate).isBetween(dateAYearAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      default:
        throw new Error(`Error statistics filter`);
    }
  }

  _getStatisticsDataFilms(films, statisticsFilter) {
    const statisticsData = {
      watchedCount: null,
      totalDuration: null,
      countGenre: null,
      topGenre: null,
      filter: statisticsFilter
    };

    const allGenres = [];

    this._choosingStatisticsFilter(statisticsFilter, statisticsData, films);

    statisticsData.watchedCount = filtersData[FilterType.HISTORY](films).length;
    statisticsData.totalDuration = filtersData[FilterType.HISTORY](films).reduce((count, {runtime}) => count + runtime, 0);

    filtersData[FilterType.HISTORY](films)
      .forEach(({genres}) => {
        if (genres.length > 0) {
          allGenres.push(...genres);
        }
      });

    if (allGenres.length > 0) {
      statisticsData.countGenre = allGenres.reduce((object, element) => {
        if (!object[element]) {
          object[element] = 0;
        }
        object[element]++;
        return object;
      }, {});
    }

    statisticsData.topGenre = Object.keys(statisticsData.countGenre)[0];

    return statisticsData;
  }
}
