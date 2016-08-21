import $ from 'jquery';
import styles from './Stats.css';

export default class Stats {

  running = false;

  render () {
    return `
      <div class=${styles.container}>
        <div class=${styles.stats}>
          <div class=${styles.wpm} data-test=wpm>
            wpm:
            <span id='wpm' class=${styles.letter}>0</span>
          </div>
          <div class=${styles.accuracy} data-test=accuracy>
            accuracy:
            <span class=${styles.letter}>
              <span id='accuracy'>0</span>%
            </span>
          </div>
        </div>
      </div>
    `;
  }

  init () {
    this.$wpm = $('#wpm');
    this.$accuracy = $('#accuracy');
  }

  start () {
    this.started = Date.now();
    this.running = true;
  }

  onChange (letterIdx, score) {
    if (!this.running) {
      this.start();
    }
    this.$accuracy.text(this.calcAccuracy(letterIdx, score));
    const wpm = this.calcWpm(score);
    this.$wpm.text(
      letterIdx < 10 ? 0 : wpm // avoid huge WPM on first letters
    );
  }

  calcWpm (score) {
    return parseInt(
      score / this.calcSeconds() * 60 / 4 // word calculated as 4 letters
    );
  }

  calcAccuracy (letterIdx, score) {
    if (!letterIdx) {
      return 0;
    }
    return parseInt(
      score / letterIdx * 100
    );
  }

  calcSeconds () {
    return (Date.now() - this.started) / 1000;
  }

}
