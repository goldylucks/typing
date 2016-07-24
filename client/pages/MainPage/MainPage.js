import $ from 'jquery';
import httpService from '../../services/httpService';
import userService from '../../services/userService';
import { route } from '../../utils/utils';

export default class MainPage {

  init () {
    this.render();
    $(document).on('click', '#submit', this.onAdd);
    $(document).on('click', '#public', this.onPublicToggle);
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      <div>
        <div>
          <h1>Consume your procrascinated texts AND improve your typing at the same time!</h1>
        </div>
        <div>
          <h2>Put your text in the box below and start practicing</h2>
          <div class='form-control'>
            <input id='title' placeholder='text title' />
          </div>
          <div class='form-control'>
            <textarea id='text' placeholder='paste your text here to start practicing'></textarea>
          </div>
          <div class='form-control'>
            <input id='public' type='checkbox' checked /> Public
          </div>
          <button id='submit'>Start</button>
          <div id='error'></div>
        </div>
        <div>
          <strong>NOTE:</strong> This is NOT a tutorial / beginner's guide for blind typing. If u r totally new to blind typing, I recommended <a href='//typingclub.com' target='_blank'>this</a> resource (it's how I got started).
        </div>
        <div>
          Don't have a text of your own? Try the <a href='/nav'>existing texts</a> instead.
        </div>
      </div>
    `;
  }

  onAdd = evt => {
    $('#error').text('');
    $('#submit').attr('disabled', true);
    httpService.POST('texts', {
      title: $('#title').val(),
      body: $('#body').val(),
      public: $('#public').val()
    })
    .then(this.onSubmitSuccess)
    .catch(this.onSubmitError)
    .finally(() => $('#submit').removeAttr('disabled'));
  }

  onPublicToggle = evt => {
    if (userService.isLogged()) {
      return;
    }
    evt.preventDefault();
    alert('Register to add a private text');
    // TODO :: open auth modal
  }

  onSubmitSuccess = newText => {
    route('/texts/' + newText._id);
  }

  onSubmitError = error => {
    $('#error').text(error);
  }

}
