import $ from 'jquery';

import Header from '../../components/Header';
import httpService from '../../services/httpService';
import styles from './FinishPage.css';

export default class FinishPage {

  constructor (state) {
    this.id = state.id;
    this.title = state.title;
    this.wpm = state.wpm;
    this.seconds = state.seconds;
    this.accuracy = state.accuracy;
    this.$html = $(this.html());
    this.header = new Header();
  }

  init () {
    this.render('#appContainer');
    this.header.render('#header');
    this.fetchHistory()
      .then(this.renderHistory);
  }

  render (selector) {
    $(selector).html(this.$html);
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
          <div class=${styles.actions}>
            <a href='nav'>menu</a>
            <a href='texts/${id}'>redo</a>
          </div>
          <h2>History</h2>
          <table class='table table-striped'>
            <thead>
              <tr>
                <th>Text</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id='history'></tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderHistory (history) {
    $('#history').html(
      history.map(item => {
        return `
          <tr>
            <td>${item.text.title}</td>
            <td>${item.wpm}</td>
            <td>${item.accuracy}%</td>
            <td>${item.createdAt}</td>
          </tr>
        `;
      })
    );
  }

  fetchHistory () {
    return httpService.GET(`/history/getByText/${this.id}`);
  }

}
