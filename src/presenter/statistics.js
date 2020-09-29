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
    this._statisticsFilter = StatisticsFilter.ALL_TIME;
    this._statisticsChangeHandler = this._statisticsChangeHandler.bind(this);
  }
  init() {
    this._statisticsComponent = new StatisticsView(this._getStatisticsDataFilms(this._moviesModel.getFilms(), this._statisticsFilter));
    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.setStatisticsChangeHandler(this._statisticsChangeHandler);
  }

  removeStatisticsComponent() {
    remove(this._statisticsComponent);
  }

  _statisticsChangeHandler(statisticsValue) {
    remove(this._statisticsComponent);
    this._statisticsFilter = statisticsValue;
    this._renderStatistics();
  }

  _renderStatistics() {
    this._statisticsComponent = new StatisticsView(this._getStatisticsDataFilms(this._moviesModel.getFilms(), this._statisticsFilter));
    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.setStatisticsChangeHandler(this._statisticsChangeHandler);
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

    let watchedFilms = null;
    const currentDate = moment();
    const dateAWeekAgo = moment().subtract(7, MomentSetting.DAYS);
    const dateAMonthAgo = moment().subtract(1, MomentSetting.MONTH);
    const dateAYearAgo = moment().subtract(1, MomentSetting.YEAR);

    switch (statisticsFilter) {
      case StatisticsFilter.ALL_TIME:
        watchedFilms = filtersData[FilterType.HISTORY](films);
        statisticsData.watchedCount = watchedFilms.length;
        watchedFilms = films.filter((film) => film.watchingDay !== null);
        break;
      case StatisticsFilter.TODAY:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDay).isSame(currentDate, MomentSetting.DAY)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticsFilter.WEEK:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDay).isBetween(dateAWeekAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticsFilter.MONTH:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDay).isBetween(dateAMonthAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticsFilter.YEAR:
        watchedFilms = films.filter((film) => {
          if (moment(film.watchingDay).isBetween(dateAYearAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      default:
        throw new Error(`Error statistics filter`);
    }

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
