import $ from 'jquery';
import { API_URL } from '../../constants/constants';

export default class TextPage {

  init () {
    this.render();
    this.fetchTexts()
      .then(texts => {
        this.renderNav(texts);
      });
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      <h1>Main Page!</h1>
      <a class='addPage' href='/add-text'>Add</a>
      <div id=texts>Loading Texts ...</div>
    `;
  }

  renderNav (texts) {
    const textsHtml = texts.map(t => {
      return `<li><a href=./texts/${t._id}>${t.title}</a></li>`;
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
