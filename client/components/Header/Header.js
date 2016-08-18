import $ from 'jquery';
import userService from '../../services/userService';

export default class Header {

  constructor () {
    this.$html = $(this.html());
    this.$html.on('click', '#nav-logout', this.logout);
    $(document).on('login', this.onLogin);
  }

  render (selector) {
    $(selector).html(this.$html);
    this.$navLogin = $('#nav-login');
    this.$navLogout = $('#nav-logout');
    this.onRender();
  }

  html () {
    return `
      <nav class='navbar navbar-default'>
        <div class='container'>
          <div class='navbar-header'>
            <a class='navbar-brand' href='./'>Typing</a>
          </div>
          <ul class='nav navbar-nav navbar-right'>
            <li><a href='add-text'>Add</a></li>
            <li><a href='nav'>Texts</a></li>
            <li><a href='#' data-toggle='modal' data-target='#authModal' id='nav-login' style='display: none;'>Login</a></li>
            <li><a href='#' id='nav-logout' style='display: none;'>Logout</a></li>
          </ul>
        </div>
      </nav>
    `;
  }

  onLogin = user => {
    this.$navLogin.hide();
    this.$navLogout.show();
  }

  logout = evt => {
    evt.preventDefault();
    this.$navLogin.show();
    this.$navLogout.hide();
    $(document).trigger('logout');
  }

  onRender () {
    if (userService.isLogged()) {
      this.$navLogout.show();
      return;
    }

    this.$navLogin.show();
  }

}
