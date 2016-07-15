import $ from 'jquery';
import { emit } from '../../utils/utils';
import Text from '../../components/Text';
import Stats from '../../components/Stats';
import { API_URL } from '../../constants/constants';

export default class TextPage {

  constructor () {
    this.id = this.idFromWindow();
  }

  fetchText () {
    return new Promise((resolve, reject) => {
      return $.get(`${API_URL}/texts/${this.id}`, textToType => resolve(textToType));
    });
  }

  idFromWindow () {
    return window.location.pathname.replace('/texts/', '');
  }

  init () {
    this.render();
    this.fetchText().then(textDoc => {
      this.textDoc = textDoc;
      this.letters = textDoc.body.split('');
      this.text = new Text(this.letters, this.onFinish);
      this.stats = new Stats();
      $('#textContainer').html(this.text.render());
      $('#statsContainer').html(this.stats.render());
      this.text.init();
      this.stats.init();
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

  onFinish = () => {
    const { stats, id } = this;
    const { title } = this.textDoc;
    const wpm = stats.calcWpm();
    const seconds = stats.calcSeconds();
    const accuracy = stats.calcAccuracy();
    emit('finishText', id, title, wpm, seconds, accuracy);
  }

}
