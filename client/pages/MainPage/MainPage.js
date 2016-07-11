import $ from 'jquery';
import { API_URL } from '../../constants/constants';

export default class TextPage {

  constructor () {
    this.texts = [];
    this.textsPromise = this.fetchTexts();
    this.textsPromise
      .then(texts => {
        this.texts = texts;
      });
  }

  init () {
    this.render();
    this.textsPromise
      .then(texts => {
        this.renderNav(texts);
      });
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      '<h1>Main Page!</h1>'
      '<div id=texts>Loading ...</div>'
    `;
  }

  renderNav (texts) {
    const textsHtml = texts.map(t => {
      return `<li><a href='./texts/${t.title}'>${t.title}</li>`;
    });
    const html = `
      <ul>
        ${textsHtml}
      </ul>
    `;
    $('#texts').html(html);
  }

  fetchTexts () {
    return new Promise((resolve, reject) => {
      return $.get(`${API_URL}/texts`, texts => resolve(texts));
    });
  }
}
