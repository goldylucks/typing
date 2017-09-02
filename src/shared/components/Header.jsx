// @flow

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Modal from 'react-modal'
import { connect } from 'react-redux'

import * as AuthActions from '../modules/authModal/actions'
import LoginForm from '../modules/authModal/LoginForm'

const styles = {
  authModal: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      minWidth: '600px',
    },
  },
}

class Header extends React.Component {
  props: {
    authenticated: boolean,
    modalIsOpen: boolean,
    handleSignOut: Function,
    closeModal: Function,
    openModal: Function,
  }

  renderHistoryLinks() {
    return (
      this.props.authenticated ?
        <li className="nav-item" key="/history">
          <NavLink to="/history" className="nav-link" activeStyle={{ color: 'black' }} exact>History</NavLink>
        </li> : null
    )
  }

  renderAuthLinks() {
    return (
      this.props.authenticated ?
        <li><a className="nav-item" onClick={this.props.handleSignOut}>Logout</a></li>
        : <li><a className="nav-item" onClick={this.props.openModal}>Login</a></li>
    )
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
              ].map(link => (
                <li className="nav-item" key={link.route}>
                  <NavLink to={link.route} className="nav-link" activeStyle={{ color: 'black' }} exact>{link.label}</NavLink>
                </li>
              ))}
              {this.renderHistoryLinks()}
              {this.renderAuthLinks()}
            </ul>
          </div>
        </nav>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Signup"
          style={styles.authModal}
        >
          <div className="modal-header">
            <button className="close" onClick={this.props.closeModal}><span aria-hidden="true">&times;</span></button>
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

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  modalIsOpen: state.auth.modalIsOpen,
})

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => { dispatch(AuthActions.signOutUser()) },
  closeModal: () => { dispatch(AuthActions.closeModal()) },
  openModal: () => { dispatch(AuthActions.openModal()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
