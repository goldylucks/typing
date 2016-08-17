export default class Header {

  render () {
    return `
      <nav class='navbar navbar-default'>
        <div class='container'>
          <div class='navbar-header'>
            <a class='navbar-brand' href='./'>Typing</a>
          </div>
          <ul class='nav navbar-nav navbar-right'>
            <li><a href='add-text'>Add</a></li>
            <li><a href='nav'>Texts</a></li>
            <li><a href='#'>Login</a></li>
          </ul>
        </div>
      </nav>
    `;
  }

}
