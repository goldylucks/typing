import $ from 'jquery';
import Text from '../../components/Text';
import Stats from '../../components/Stats';


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
    const url = this.pathFromWindow();
    return new Promise((resolve, reject) => {
      return $.get(url, textToType => resolve(textToType));
    });
  }

  pathFromWindow () {
    const path = window.location.pathname.replace('/texts/', '');
    return `../../texts/${path}.txt`;
  }

  init () {
    this.render();
    this.textPromise.then(textToType => {
      const letters = textToType.split('');
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
