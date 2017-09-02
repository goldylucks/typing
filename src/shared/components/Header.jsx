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
  state = {
    modalIsOpen: false,
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  props: {
    authenticated: boolean,
    handleSignOut: Function,
  }

  renderHistoryLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item" key="/history">
          <NavLink to="/history" className="nav-link" activeStyle={{ color: 'black' }} exact>History</NavLink>
        </li>)
    }
    // eslint-disable-next-line
    return
  }

  renderAuthLinks() {
    if (this.props.authenticated) {
      return (
        <li><a className="nav-item" onClick={this.props.handleSignOut}>Logout</a></li>)
    }
    return (
      <li><a className="nav-item" onClick={this.openModal}>Login</a></li>)
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
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Signup"
          style={styles.authModal}
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

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
})

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => { dispatch(AuthActions.signOutUser()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
