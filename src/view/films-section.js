import AbstractView from './abstract.js';

export default class FilmsSection extends AbstractView {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
