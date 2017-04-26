// @flow

import React from 'react'

const Header = () =>
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="./">Typing</a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="add-text">Add</a></li>
        <li><a href="nav">Texts</a></li>
        <li><a href="history">History</a></li>
        <li><a>Login</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </nav>

export default Header
