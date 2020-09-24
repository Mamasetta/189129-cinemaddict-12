import AbstractView from './abstract.js';

export default class FooterStatistics extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return (
      `<p>${this._count} movies inside</p>`
    );
  }
}
