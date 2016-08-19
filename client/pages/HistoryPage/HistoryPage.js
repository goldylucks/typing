import $ from 'jquery';
import httpService from '../../services/httpService';
import Header from '../../components/Header';

export default class HistoryPage {

  constructor () {
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
    return `
      <div>
        <div id='header'></div>
        <div class='container'>
          <h1>Your typing history</h1>
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
    return httpService.GET('/history');
  }

}
