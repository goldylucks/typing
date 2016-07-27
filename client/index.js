import $ from 'jquery';
import './index.html';
import './index.css';
import { onEmit } from './utils/utils';
import NavPage from './pages/NavPage';
import TextPage from './pages/TextPage';
import MainPage from './pages/MainPage';
import FinishPage from './pages/FinishPage';
import AddTextPage from './pages/AddTextPage';

$(document).ready(init);
onEmit('route', onRoute);
onEmit('finishText', onFinishText);

function init () {
  const { state } = window.history;
  const PageClass = Page(window.location.pathname);
  const page = new PageClass(state);
  page.init();
}

function Page (pathname) {
  if (pathname.match('/texts/')) {
    return TextPage;
  }

  if (pathname.match('/finish/')) {
    return FinishPage;
  }

  if (pathname.match('/add-text')) {
    return AddTextPage;
  }

  if (pathname.match('/nav')) {
    return NavPage;
  }

  return MainPage;
}

function onRoute (path, state) {
  window.history.pushState(state, '', path);
  init();
}

function onFinishText (id, title, wpm, seconds, accuracy) {
  onRoute(`/finish/${id}`, { id, title, wpm, seconds, accuracy });
}
