import $ from 'jquery';

export default class Stats {

  running = false;

  render () {
    return `
      <div class='stats-container'>
        <div class="stats">
          <div class='wpm'>
            wpm:
            <span id='wpm' class='letter'>0</span>
          </div>
          <div class='accuracy'>
            accuracy:
            <span class='letter'>
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
      letterIdx < 10 ? Math.min(wpm, 160) : wpm // avoid huge WPM on first letters
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
