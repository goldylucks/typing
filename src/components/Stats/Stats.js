import $ from 'jquery';

export default class Stats {
  init () {
    this.$wpm = $('#wpm');
    this.started = Date.now();
    this.interval = setInterval(::this.wpmInterval, 100);
  }

  wpmInterval () {
    this.$wpm.text(this.calcWpm());
  }

  calcWpm () {
    return parseInt(this.getCorrectKeys().length / this.calcSecondsElapsed() * 60 / 4);
  }

  calcSecondsElapsed () {
    return (Date.now() - this.started) / 1000;
  }

  getCorrectKeys () {
    return $('.letter.correct');
  }

}
