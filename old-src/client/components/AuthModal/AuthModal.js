import $ from 'jquery'
import httpService from '../../services/httpService'

export default class AuthModal {

  constructor() {
    this.$html = $(this.html())
    this.$html.on('click', '#login', this.onLogin)
    this.$html.on('click', '#signup', this.onSignup)
  }

  render(selector) {
    $(selector).html(this.$html)
    this.$modal = $('#authModal')
    this.$modal.on('shown.bs.modal', ::this.onShow)
    this.$email = $('#email')
    this.$password = $('#password')
    this.$login = $('#login')
    this.$signup = $('#signup')
  }

  html() {
    return `
      <div class='modal fade' id='authModal' tabindex='-1' role='dialog' aria-labelledby='Signup'>
        <div class='modal-dialog' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
              <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h4 class='modal-title'>Signup</h4>
            </div>
            <div class='modal-body'>
              <div class='form-group'>
                <label for='email' class='control-label'>Email:</label>
                <input type='email' class='form-control' id='email' placeholder='type your email here'>
              </div>
              <div class='form-group'>
                <label for='password' class='control-label'>Password:</label>
                <input type='password' class='form-control' id='password' placeholder='type your super secret password here'></textarea>
              </div>
            </div>
            <div class='modal-footer'>
              <button type='button' class='btn btn-default' id='login'>Login</button>
              <button type='button' class='btn btn-primary' id='signup'>Signup</button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  onShow = (evt) => {
    this.$email.focus()
  }

  onLogin = (evt) => {
    const email = this.$email.val()
    const password = this.$password.val()
    httpService.POST('users/login', { email, password })
    .then((user) => {
      console.info('[AUTH MODAL] user logged in, saving to LS', user)
      global.localStorage.setItem('user', JSON.stringify(user))
      $(document).trigger('login', [user])
      this.$modal.modal('hide')
    })
    .catch((err) => {
      console.warn('[AUTH MODAL] error login in with email', err)
    })
    .then(() => this.onSendEnd)
  }

  onSignup = (evt) => {
    const email = this.$email.val()
    const password = this.$password.val()
    httpService.POST('users', { email, password })
    .then((user) => {
      console.info('[AUTH MODAL] user created and logged in, saving to LS', user)
      global.localStorage.setItem('user', JSON.stringify(user))
      $(document).trigger('login', [user])
      this.$modal.modal('hide')
    })
    .catch((err) => {
      console.warn('[AUTH MODAL] error Signup in with email', err)
    })
    .then(() => this.onSendEnd)
  }

  onSendStart = () => {
    this.$login.attr('disabled', 'disabled')
    this.$signup.attr('disabled', 'disabled')
  }

  onSendEnd = () => {
    this.$login.removeAttr('disabled', 'disabled')
    this.$signup.removeAttr('disabled', 'disabled')
  }

}
