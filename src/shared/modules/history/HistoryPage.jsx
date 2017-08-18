// @flow

import React, { Component } from 'react'

import { Header } from '../../components'

class HistoryPage extends Component {

  state = {
    history: [
      { title: 'My static text', wpm: 63, accuracy: '100%', date: 'August 15, 2017' },
      { title: 'Another static text', wpm: 73, accuracy: '60%', date: 'August 15, 2017' },
    ],
  }

  renderHistoryList() {
    return (
      this.state.history.map(history =>
        <tr key={history.title}>
          <td>{history.title}</td>
          <td>{history.wpm}</td>
          <td>{history.accuracy}</td>
          <td>{history.date}</td>
        </tr>,
      )
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Your typing history</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Text</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.renderHistoryList()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default HistoryPage
