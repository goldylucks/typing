import $ from 'jquery'
import Header from '../../components/Header'
import userService from '../../services/userService'
import httpService from '../../services/httpService'
import { route } from '../../utils/utils'
import styles from './AddTextPage.css'

export default class AddTextPage {

  constructor() {
    this.header = new Header()
    $(document).on('click', '#submit', this.onSubmit)
    $(document).on('click', '#public', this.onPublicToggle)
  }

  init() {
    this.render()
    this.header.render('#header')
  }

  render() {
    $('#appContainer').html(this.html())
  }

  html() {
    return `
      <div>
        <div id='header'></div>
        <div class='container'>
          <div class='row ${styles.title}'>
            <div class='col col-md-12'>
              <h1>Add your own text to practice typing</h1>
            </div>
          </div>
          <div class='row'>
            <form id='form'>
              <div class='col col-md-12'>
                <div class='form-group'>
                  <input id='title' class='form-control' required placeholder='Give your text a lovely title' />
                </div>
              </div>
              <div class='col col-md-12'>
                <div class='form-group'>
                  <textarea id='body' rows='15' class='form-control' placeholder='Copy paste your text here (or type it directly)' required></textarea>
                </div>
              </div>
              <div class='col col-md-12'>
                <div class='checkbox'>
                  <label>
                    <input id='public' type='checkbox' checked required />
                    Public
                </div>
              </div>
              <div class='col col-md-4'>
                <button id='submit' class='btn btn-lg btn-primary btn-block' type='button'>submit</button>
              </div>
            </form>
            <div id='error'></div>
          </div>
        </div>
      </div>
    `
  }

  onSubmit = () => {
    $('#error').text('')
    $('#submit').attr('disabled', true)
    httpService.POST('texts', {
      title: $('#title').val(),
      body: $('#body').val(),
      public: $('#public').val(),
    })
    .then(this.onSubmitSuccess)
    .catch(this.onSubmitError)
    .then(() => $('#submit').removeAttr('disabled'))
  };

  onPublicToggle = (evt) => {
    if (userService.isLogged()) {
      return
    }
    evt.preventDefault()
    window.alert('Register to add a private text') // eslint-disable-line no-alert
    $('#authModal').modal('show')
  }

  onSubmitSuccess = (newText) => {
    route(`/texts/${newText._id}`)
  }

  onSubmitError = (error) => {
    $('#error').text(error)
  }

}
