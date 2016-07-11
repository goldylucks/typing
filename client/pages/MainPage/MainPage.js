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
      ${this.renderNav()}
    `;
  }

  renderNav () {
    return `
      <ul>
        <li><a href='./texts/stan'>Stan</li>
        <li><a href='./texts/destination-poon/1'>Russian</li>
        <li><a href='./texts/destination-poon/2'>S[er</li>
      </ul>
    `;
  }
}
