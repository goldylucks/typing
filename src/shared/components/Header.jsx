// @flow

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () =>
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Typing</Link>
      </div>
      <ul className="nav navbar-nav navbar-right">
        {[
          { route: '/add-text', label: 'Add' },
          { route: '/texts', label: 'Texts' },
          { route: '/history', label: 'History' },
          { route: '/#login', label: 'Login' },
          { route: '/#logout', label: 'Logout' },
        ].map(link => (
          <li className="nav-item" key={link.route}>
            <NavLink to={link.route} className="nav-link" activeStyle={{ color: 'white' }} exact>{link.label}</NavLink>
          </li>
        ))}

      </ul>
    </div>
  </nav>

export default Header
