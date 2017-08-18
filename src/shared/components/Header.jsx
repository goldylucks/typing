// @flow

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import LoginModal from '../modules/auth_modal/LoginForm'

const Header = () =>
  <div>
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
          ].map(link => (
            <li className="nav-item" key={link.route}>
              <NavLink to={link.route} className="nav-link" activeStyle={{ color: 'black' }} exact>{link.label}</NavLink>
            </li>
          ))}
          <li><NavLink to="/#" className="nav-item" data-toggle="modal" data-target="#loginModal" activeStyle={{ color: 'black' }} exact>Login</NavLink></li>
        </ul>
      </div>
    </nav>
    <LoginModal />
  </div>

export default Header
