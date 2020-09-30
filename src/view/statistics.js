import SmartView from './smart.js';
import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const renderChart = (statisticsCtx, genres, counts) => {

  return new Chart(statisticsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: counts,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};


const createDurationStatisticsTemplate = (minutes) => {
  let hour = 0;
  let minute = 0;

  if (minutes > 0) {
    const duration = moment.duration(minutes, `minutes`);
    const times = duration.asHours().toFixed(2).split(`.`);
    hour = times[0];
    minute = times[1];
  }

  return `${hour}<span class="statistic__item-description">h</span> ${minute}<span class="statistic__item-description">m</span>`;
};

const createStatisticsTemplate = ({watchedCount, totalDuration, topGenre}, filter, currentStatistics) =>
  `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.ALL_TIME}" value="${filter.ALL_TIME}" ${currentStatistics === filter.ALL_TIME ? `checked` : ``}>
      <label for="statistic-${filter.ALL_TIME}" class="statistic__filters-label">All time</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.TODAY}" value="${filter.TODAY}" ${currentStatistics === filter.TODAY ? `checked` : ``}>
      <label for="statistic-${filter.TODAY}" class="statistic__filters-label">Today</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.WEEK}" value="${filter.WEEK}" ${currentStatistics === filter.WEEK ? `checked` : ``}>
      <label for="statistic-${filter.WEEK}" class="statistic__filters-label">Week</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.MONTH}" value="${filter.MONTH}" ${currentStatistics === filter.MONTH ? `checked` : ``}>
      <label for="statistic-${filter.MONTH}" class="statistic__filters-label">Month</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.YEAR}" value="${filter.YEAR}" ${currentStatistics === filter.YEAR ? `checked` : ``}>
      <label for="statistic-${filter.YEAR}" class="statistic__filters-label">Year</label>
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedCount ? watchedCount : `0`} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${createDurationStatisticsTemplate(totalDuration)}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre ? topGenre : ``}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;

export default class Statistics extends SmartView {
  constructor(statisticsData, statisticsFilter, currentStatisticsType) {
    super();
    this._statisticsData = statisticsData;
    this._statisticsFilter = statisticsFilter;
    this._currentStatisticsType = currentStatisticsType;
    this._statisticsChangeHandler = this._statisticsChangeHandler.bind(this);
    this._setChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._statisticsData, this._statisticsFilter, this._currentStatisticsType);
  }

  setStatisticsChangeHandler(callback) {
    this._callback._statisticsChange = callback;
    this.getElement()
      .querySelectorAll(`.statistic__filters-input`)
      .forEach((element) => element.addEventListener(`input`, this._statisticsChangeHandler));
  }

  _statisticsChangeHandler(evt) {
    evt.preventDefault();
    this._callback._statisticsChange(evt.target.value);
  }

  _setChart() {
    if (this._statisticsData.countGenre !== null) {
      const genres = Object.keys(this._statisticsData.countGenre);
      const counts = Object.values(this._statisticsData.countGenre);
      const countLine = genres.length;
      const statisticsCtx = this.getElement().querySelector(`.statistic__chart`);
      statisticsCtx.height = BAR_HEIGHT * countLine;
      renderChart(statisticsCtx, genres, counts);
    }
  }
}
