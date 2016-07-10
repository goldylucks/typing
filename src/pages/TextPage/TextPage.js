import $ from 'jquery';
import Text from '../../components/Text';
import Stats from '../../components/Stats';
import str from '../../texts/positiveAffirmations.txt';
const letters = str.split('');
const text = new Text(letters);
const stats = new Stats();

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
    return new Promise((resolve, reject) => {
      return $.get('../../texts/positiveAffirmations.txt', textToType => resolve(textToType));
    });
  }

  init () {
    this.render();
    $('#textContainer').html(text.render());
    $('#statsContainer').html(stats.render());
    this.textPromise.then(textToType => {
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
