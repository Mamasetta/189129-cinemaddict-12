import AbstractView from "./abstract.js";

export default class FooterStatistics extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate(count) {
    return (
      `<p>${count} movies inside</p>`
    );
  }
}
