import $ from 'jquery';

export default class FinishPage {

  constructor (state) {
    this.id = state.id;
    this.title = state.title;
    this.wpm = state.wpm;
    this.seconds = state.seconds;
    this.accuracy = state.accuracy;
  }

  init () {
    this.render();
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    const { id, title, wpm, accuracy, seconds } = this;
    return `
      <div>
        <div class='header'></div>
        <div class='title'>${title}</div>
        <div class='stats'>
          <div class='stat'>
            <span class='name'>Speed</span>
            <span class='measure'>${wpm} WPM</span>
          </div>
          <div class='stat'>
            <span class='name'>Accuracy</span>
            <span class='measure'>${accuracy}%</span>
          </div>
          <div class='stat'>
            <span class='name'>Time</span>
            <span class='measure'>${seconds} seconds</span>
          </div>
        </div>
        <div class='actions'>
          <a href=/nav>menu</a>
          <a href=/texts/${id}>redo</a>
        </div>
      </div>
    `;
  }
}
