import MainNavigationView from '../view/main-navigation.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UpdateType, FilterType} from '../constants.js';
import {filtersData} from '../utils/filter.js';

const StatisticsMode = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN`
};

export default class Filter {
  constructor(filterContainer, filterModel, moviesModel, statisticsPresenter, movieListPresenter) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._filterElement = null;
    this._statisticsPresenter = statisticsPresenter;
    this._movieListPresenter = movieListPresenter;

    this._currentFilter = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._changeStatisticsMode = this._changeStatisticsMode.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._statisticsMode = StatisticsMode.DEFAULT;
  }

  init() {
    this._currentFilter = this._filterModel.get();

    const filters = this._getFilters();
    const prevFilterElement = this._filterElement;

    this._filterElement = new MainNavigationView(filters, this._currentFilter);
    this._filterElement.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterElement.setStatisticsClickHandler(this._changeStatisticsMode);

    if (prevFilterElement === null) {
      render(this._filterContainer, this._filterElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterElement, prevFilterElement);
    remove(prevFilterElement);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._statisticsMode === StatisticsMode.OPEN) {
      this._statisticsMode = StatisticsMode.DEFAULT;
      this._statisticsPresenter.remove();
      this._movieListPresenter.show();
      this._filterElement.getElement()
        .querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__item--active`);
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._moviesModel.get();

    return [
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filtersData[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filtersData[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filtersData[FilterType.FAVORITES](films).length
      }
    ];
  }

  _changeStatisticsMode() {
    if (this._statisticsMode === StatisticsMode.DEFAULT) {
      this._statisticsMode = StatisticsMode.OPEN;
      this._statisticsPresenter.init();
      this._movieListPresenter.hide();
    } else {
      this._statisticsMode = StatisticsMode.DEFAULT;
      this._statisticsPresenter.remove();
      this._movieListPresenter.show();
      this._movieListPresenter.reset();
    }
  }
}
