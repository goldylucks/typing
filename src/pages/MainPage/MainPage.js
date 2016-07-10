import $ from 'jquery';

export default class TextPage {

  init () {
    this.render();
  }

  render () {
    $('#appContainer').html(this.html());
  }

  html () {
    return `
      '<h1>Main Page!</h1>'
    `;
  }
}

// <div class='header'></div>
// text.init();
// stats.init();