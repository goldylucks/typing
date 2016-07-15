import $ from 'jquery';
import { route } from '../../utils/utils';
import { API_URL } from '../../constants/constants';

export default class AddTextPage {

  constructor () {
    $(document).on('click', '#submit', this.onSubmit);
  }

  init () {
    this.render();
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      <div>
        <div class='header'></div>
        <form id='form'>
          <input id='title' required placeholder='title' />
          <input id='public' type='checkbox' required /> Public
          <br />
          <textarea id='body' placeholder='text goes here ...' required></textarea>
          <br />
          <button id='submit' type='button'>submit</button>
        </form>
        <div id='error'></div>
      </div>
    `;
  }

  onSubmit = () => {
    $('#error').text('');
    $('#submit').attr('disabled', true);
    $.post(`${API_URL}/texts`, {
      title: $('#title').val(),
      body: $('#body').val(),
      public: $('#public').val()
    })
    .done(this.onSubmitSuccess)
    .fail(this.onSubmitError)
    .always(() => $('#submit').removeAttr('disabled'));
  };

  onSubmitSuccess (newText) {
    route('/texts/' + newText._id);
  }

  onSubmitError (error) {
    $('#error').text(error);
  }

}
