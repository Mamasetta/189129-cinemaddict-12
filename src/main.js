import {FILMS_COUNT} from './constants.js';

import {getNewArray} from './utils/common.js';
import {RenderPosition, render} from './utils/render.js';

import ProfileRatingView from './view/profile-rating.js';
import MainNavigationView from './view/main-navigation.js';
import FooterStatisticsView from './view/footer-statistics.js';

import MovieListPresenter from './presenter/movie-list.js';

import MoviesModel from './model/movies.js';

import {generateFilmData} from './mock/films.js';
import {generateFilterData} from './mock/filter.js';

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerStatisticsElement = bodyElement.querySelector(`.footer__statistics`);

const films = getNewArray(FILMS_COUNT, generateFilmData);
const filters = generateFilterData(films);

const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

render(headerElement, new ProfileRatingView(), RenderPosition.BEFOREEND);

render(mainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);

new MovieListPresenter(bodyElement, mainElement, moviesModel).init();

render(footerStatisticsElement, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);


