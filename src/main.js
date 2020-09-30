import {UpdateType} from './constants.js';
import Api from './api.js';
import {RenderPosition, render} from './utils/render.js';

import ProfileRatingView from './view/profile-rating.js';
import FooterStatisticsView from './view/footer-statistics.js';

import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/filter.js';
import StatisticsPresenter from './presenter/statistics.js';

import MoviesModel from './model/movies.js';
import FiltersModel from './model/filters.js';


const AUTHORIZATION = `Basic y7m9xc4gtkd5hc3g`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);

const moviesModel = new MoviesModel();
const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FiltersModel();

render(headerElement, new ProfileRatingView(), RenderPosition.BEFOREEND);

const statisticsPresenter = new StatisticsPresenter(mainElement, moviesModel);
const movieListPresenter = new MovieListPresenter(bodyElement, mainElement, moviesModel, filterModel, api);
movieListPresenter.init();
new FilterPresenter(mainElement, filterModel, moviesModel, statisticsPresenter, movieListPresenter).init();

api.getFilms()
  .then((films) => {
    moviesModel.set(UpdateType.INIT, films);
    render(footerStatisticsElement, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);
  });

