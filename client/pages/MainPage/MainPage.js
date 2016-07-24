import $ from 'jquery';
import { API_URL } from '../../constants/constants';
import AuthModal from '../../components/AuthModal';

export default class TextPage {

  constructor () {
    this.authModal = new AuthModal();
  }

  init () {
    this.render();
    this.renderAuth();
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
      <div id='auth'>Loading auth ...</div>
      <a class='addPage' href='/add-text'>Add</a>
      <div id=texts>Loading Texts ...</div>
    `;
  }

  renderAuth () {
    $('#auth').html(this.authModal.render());
    this.authModal.init();
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
