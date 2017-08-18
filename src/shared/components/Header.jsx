// @flow

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Modal from 'react-modal'

import LoginForm from '../modules/auth_modal/LoginForm'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '600px',
  },
}

class Header extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  state: {
    modalIsOpen: boolean,
  }

  openModal: Function
  closeModal: Function

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
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
              <li><NavLink to="/#" className="nav-item" onClick={this.openModal} activeStyle={{ color: 'black' }} exact>Login</NavLink></li>
            </ul>
          </div>
        </nav>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Signup"
          style={customStyles}
        >
          <div className="modal-header">
            <button className="close" onClick={this.closeModal}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Signup</h4>
          </div>
          <div className="modal-body">
            <LoginForm />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Header
