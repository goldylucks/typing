import $ from 'jquery';
import './index.html';
import TextPage from './pages/TextPage';
import MainPage from './pages/MainPage';

$(document).ready(init);

function init () {
  const PageClass = Page();
  const page = new PageClass();
  page.init();
}

function Page () {
  return TextPage;
  return window.location.pathname;
}
