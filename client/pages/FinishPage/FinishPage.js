import $ from 'jquery';

import Header from '../../components/Header';
import styles from './FinishPage.css';

export default class FinishPage {

  constructor (state) {
    this.id = state.id;
    this.title = state.title;
    this.wpm = state.wpm;
    this.seconds = state.seconds;
    this.accuracy = state.accuracy;
    this.header = new Header();
  }

  init () {
    this.render();
    this.header.render('#header');
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    const { id, title, wpm, accuracy, seconds } = this;
    return `
      <div>
        <div id='header'></div>
        <div class='container'>
          <h1 class='${styles.title}'>Result for ${title}</h1>
          <div class='row ${styles.stats}'>
            <div class='col col-md-4'>
              Speed
              <span class='pull-right'>${wpm} WPM</span>
            </div>
          </div>
          <div class='row ${styles.stats}'>
            <div class='col col-md-4'>
              Accuracy
              <span class='pull-right'>${accuracy}%</span>
            </div>
          </div>
          <div class='row ${styles.stats}'>
            <div class='col col-md-4'>
              Time
              <span class='pull-right'>${seconds.toFixed(1)} s</span>
            </div>
          </div>
          <div class='actions'>
            <a href='nav'>menu</a>
            <a href='texts/${id}'>redo</a>
          </div>
        </div>
      </div>
    `;
  }
}
