import $ from 'jquery';
import httpService from '../../services/httpService';

export default class TextPage {

  init () {
    this.render();
    this.fetchTexts()
      .then(this.renderNav);
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
    return httpService.GET('texts');
  }
}
