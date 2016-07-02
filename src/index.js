import keyMap from './keymap.json';
import $ from 'jquery';
const str = 'I am happy';
const letters = str.split('');
const $cursor = $('#cursor');
let idx = 0;

init();

$(document).on('keydown', onKeyDown);
$(document).on('keyup', onKeyUp);

function init () {
  renderLetters(letters);
  setInterval(cursorInterval, 300);
}

function renderLetters (letters) {
  const $letters = letters.map((l, idx) => $(`<span id=l-${idx} class='letter'>${l}</span>`));
  $('#text').append($letters);
}

function onKeyDown (evt) {
  evt.preventDefault();
  let key = keyMap[String(evt.which)];
  if (key === 'shift') {
    return;
  }
  l(idx).removeClass('active');
  if (key === 'backspace') {
    onBackSpace(idx);
    idx--;
    return;
  }
  if (evt.shiftKey) {
    key = key.toUpperCase();
  }
  if (key === letters[idx]) {
    onCorrectKey(idx);
  } else {
    onWrongKey(idx);
  }
  idx++;
}

function onKeyUp () {
  l(idx).addClass('active');
  adjustCursor(idx);
}

function onCorrectKey (idx) {
  l(idx).removeClass('wrong').addClass('correct dirty');
}

function onWrongKey (idx) {
  l(idx).removeClass('correct').addClass('wrong dirty');
}

function onBackSpace (idx) {
  l(idx - 1).removeClass('wrong correct');
}

function l (idx) {
  return $('#l-' + idx);
}

function cursorInterval () {
  $cursor.toggleClass('active');
}

function adjustCursor () {
  const { top, left } = l(idx).position();
  $cursor.css({ top, left });
}
