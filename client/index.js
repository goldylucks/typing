import $ from 'jquery';
import './index.html';
import TextPage from './pages/TextPage';
import MainPage from './pages/MainPage';

$(document).ready(init);

function init () {
  const PageClass = Page(window.location.pathname);
  const page = new PageClass();
  page.init();
}

function Page (pathname) {
  if (pathname.match('/texts/')) {
    return TextPage;
  }

  return MainPage;
}
