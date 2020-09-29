import {FILMS_COUNT} from './constants.js';

import {getNewArray} from './utils/common.js';
import {RenderPosition, render} from './utils/render.js';

import ProfileRatingView from './view/profile-rating.js';
import FooterStatisticsView from './view/footer-statistics.js';

import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/filter.js';
import StatisticsPresenter from './presenter/statistics.js';

import MoviesModel from './model/movies.js';
import FiltersModel from './model/filters.js';

import {generateFilmData} from './mock/films.js';

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);

const films = getNewArray(FILMS_COUNT, generateFilmData);

const moviesModel = new MoviesModel();
moviesModel.set(films);

const filterModel = new FiltersModel();

render(headerElement, new ProfileRatingView(), RenderPosition.BEFOREEND);

const statisticsPresenter = new StatisticsPresenter(mainElement, moviesModel);
const movieListPresenter = new MovieListPresenter(bodyElement, mainElement, moviesModel, filterModel);
movieListPresenter.init();
new FilterPresenter(mainElement, filterModel, moviesModel, statisticsPresenter, movieListPresenter).init();

render(footerStatisticsElement, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);

