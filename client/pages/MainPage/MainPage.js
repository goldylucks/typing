import $ from 'jquery';
import AuthModal from '../../components/AuthModal';
import Header from '../../components/Header';
import styles from './MainPage.css';

export default class MainPage {

  constructor () {
    this.authModal = new AuthModal();
    this.header = new Header();
  }

  init () {
    this.render();
    this.header.render('#header');
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      <div>
        <div id='header'></div>
        <div class='container'>
          <div class='row ${styles.title}'>
            <h1 class='text-center'>Practice your typing with ...</h1>
          </div>
          <div class='row'>
            <div class='col col-md-6'>
              <a href='nav' class="btn btn-default btn-lg btn-block ${styles.actionButton}">Existing texts</a>
            </div>
            <div class='col col-md-6'>
              <a href='add-text' class="btn btn-primary btn-lg btn-block ${styles.actionButton}">Your own text</a>
            </div>
          </div>
          <div class='row ${styles.footnote}'>
            <div class='col col-md-12'>
              <p>
                <strong>NOTE:</strong> This is NOT a tutorial / beginner's guide for blind typing. If u r totally new to blind typing, I recommended <a href='//typingclub.com' target='_blank'>this</a> resource (it's how I got started).
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

}
