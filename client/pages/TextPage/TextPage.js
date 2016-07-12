import $ from 'jquery';
import Text from '../../components/Text';
import Stats from '../../components/Stats';
import { API_URL } from '../../constants/constants';

export default class TextPage {

  constructor () {
    this.textToType = '';
    this.textPromise = this.fetchText();
    this.textPromise
      .then(textToType => {
        this.textToType = textToType;
      });
  }

  fetchText () {
    const id = this.idFromWindow();
    return new Promise((resolve, reject) => {
      return $.get(`${API_URL}/texts/${id}`, textToType => resolve(textToType));
    });
  }

  idFromWindow () {
    return window.location.pathname.replace('/texts/', '');
  }

  init () {
    this.render();
    this.textPromise.then(textDoc => {
      const letters = textDoc.body.split('');
      const text = new Text(letters);
      const stats = new Stats();
      $('#textContainer').html(text.render());
      $('#statsContainer').html(stats.render());
      text.init();
      stats.init();
    });
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      <div>
        <div class='header'></div>
        <div id='textContainer'></div>
        <div id='statsContainer'></div>
      </div>
    `;
  }
}
