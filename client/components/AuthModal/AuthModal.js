import $ from 'jquery';
import { API_URL } from '../../constants/constants';

export default class AuthModal {

  render () {
    return `
      <div>
        <div class='form-control'>
          <label for='email'>Email</label>
          <input id='email' type='email' required />
        </div>
        <div class='form-control'>
          <label for='password'>Password</label>
          <input id='password' type='password' required />
        </div>
        <button type='button' id='login'>Login</button>
        <button type='button' id='signup'>Register</button>
      </div>
    `;
  }

  init () {
    this.$email = $('#email');
    this.$password = $('#password');
    this.$login = $('#login');
    this.$signup = $('#signup');
    $(document).on('click', '#login', this.onLogin);
    $(document).on('click', '#signup', this.onSignup);
  }

  onLogin = evt => {
    const email = this.$email.val();
    const password = this.$password.val();
    $.post(`${API_URL}/users/login`, { email, password })
    .done(user => {
      console.info('[AUTH MODAL] user logged in, saving to LS', user);
      global.localStorage.setItem('user', JSON.stringify(user));
    })
    .fail(err => {
      console.warn('[AUTH MODAL] error login in with email', err);
    })
    .always(() => this.onSendEnd);
  }

  onSignup = evt => {
    const email = this.$email.val();
    const password = this.$password.val();
    $.post(`${API_URL}/users`, { email, password })
    .done(user => {
      console.info('[AUTH MODAL] user created and logged in, saving to LS', user);
      global.localStorage.setItem('user', JSON.stringify(user));
    })
    .fail(err => {
      console.warn('[AUTH MODAL] error login in with email', err);
    })
    .always(() => this.onSendEnd);
  }

  onSendStart = () => {
    this.$login.attr('disabled', 'disabled');
    this.$signup.attr('disabled', 'disabled');
  }

  onSendEnd = () => {
    this.$login.removeAttr('disabled', 'disabled');
    this.$signup.removeAttr('disabled', 'disabled');
  }

}
