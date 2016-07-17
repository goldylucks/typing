import $ from 'jquery';
import { emit } from '../../utils/utils';
import Text from '../../components/Text';
import Stats from '../../components/Stats';
import { API_URL } from '../../constants/constants';

export default class TextPage {

  letterIdx = 0;
  score = 0;

  constructor () {
    this.id = this.idFromWindow();
  }

  init () {
    document.addEventListener('keydown', this.onKeyDown);
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

  onKeyDown = evt => {
    const { idxChange, scoreChange, isFinished, shouldIgnore } = this.text.onKeyDown(evt, this.letterIdx);
    if (shouldIgnore) {
      return;
    }
    evt.preventDefault();
    this.letterIdx += idxChange;
    this.score += scoreChange;
    this.stats.onChange(this.letterIdx, this.score);
    if (isFinished) {
      this.onFinish();
    }
  }

  onFinish = () => {
    const { stats, id } = this;
    const { title } = this.textDoc;
    const wpm = stats.calcWpm(this.score);
    const seconds = stats.calcSeconds();
    const accuracy = stats.calcAccuracy(this.score, this.letterIdx);
    document.removeEventListener('keydown', this.onKeyDown);
    emit('finishText', id, title, wpm, seconds, accuracy);
  }

  fetchText () {
    return new Promise((resolve, reject) => {
      return $.get(`${API_URL}/texts/${this.id}`, textToType => resolve(textToType));
    });
  }

  idFromWindow () {
    return window.location.pathname.replace('/texts/', '');
  }

}
