import $ from 'jquery';
import httpService from '../../services/httpService';
import Header from '../../components/Header';
import styles from './NavPage.css';

export default class NavPage {

  constructor () {
    this.header = new Header();
  }

  init () {
    this.render();
    $('#header').html(this.header.render());
    this.fetchTexts()
      .then(this.renderNav);
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      <div>
        <div id='header'></div>
        <div class='container'>
          <div class='row ${styles.title}'>
            <div class='col col-md-12'>
              <h1>Choose a text to practice below</h1>
            </div>
          </div>
          <div class='row'>
            <div class='col col-md-12'>
              <div id='texts'>Loading Texts ...</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderNav (texts) {
    const textsHtml = texts.map(t => {
      return `<a class='list-group-item' href='texts/${t._id}'>${t.title}</a>`;
    }).join('');
    const html = `
      <div class='list-group'>
        ${textsHtml}
      </div>
    `;
    $('#texts').html(html);
  }

  fetchTexts () {
    return httpService.GET('texts');
  }
}
