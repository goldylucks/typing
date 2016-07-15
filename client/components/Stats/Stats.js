import $ from 'jquery';

export default class Stats {

  render () {
    return `
      <div class='stats-container'>
        <div class="stats">
          <div class='wpm'>
            wpm:
            <span id='wpm' class='letter'>0</span>
          </div>
          <div class='accuracy'>
            accuracy
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
    this.started = Date.now();
    this._interval = setInterval(::this.interval, 100);
  }

  interval () {
    this.$wpm.text(this.calcWpm());
    this.$accuracy.text(this.calcAccuracy());
  }

  calcWpm () {
    return parseInt(
      this.getCorrectCount() / this.calcSeconds() * 60 / 4
    );
  }

  calcAccuracy () {
    const dirtyCount = this.getDirtyCount();
    if (!dirtyCount) {
      return 0;
    }
    return parseInt(
      this.getCorrectCount() / dirtyCount * 100
    );
  }

  calcSeconds () {
    return (Date.now() - this.started) / 1000;
  }

  getCorrectCount () {
    return $('.letter.correct').length;
  }

  getDirtyCount () {
    return $('.letter.dirty').length;
  }

}
