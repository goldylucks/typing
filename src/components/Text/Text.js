import $ from 'jquery';
import { some } from 'lodash';

export default class Text {

  constructor (letters) {
    this.letters = letters;
    $(document).on('keydown', ::this.onKeyDown);
  }

  init () {
    this.renderLetters();
    this.$cursor = $('#cursor');
    this.$textContainer = $('#text-container');
    this.setLetterIdx(0);
    this._cursorInterval = setInterval(::this.cursorInterval, 300);
    this.ignoredKeys = this.getIgnoredKeys();
  }

  renderLetters () {
    const $letters = this.letters.map((l, idx) => $(`<span id=l-${idx} class='letter'>${l}</span>`));
    $('#text').append($letters);
  }

  onKeyDown (evt) {
    const { key, ctrlKey, altKey } = evt;
    if (this.shouldIgnore(key, ctrlKey, altKey)) {
      return;
    }
    evt.preventDefault();
    this.$activeLetter.removeClass('active');
    if (key === 'Backspace') {
      this.setLetterIdx(this.letterIdx - 1); // mutates this.$activeLetter
      this.$activeLetter.removeClass('wrong correct');
      return;
    }
    if (key === this.letters[this.letterIdx]) {
      this.$activeLetter.removeClass('wrong').addClass('correct dirty');
    } else {
      this.$activeLetter.removeClass('correct').addClass('wrong was-wrong dirty');
    }
    this.setLetterIdx(this.letterIdx + 1);
  }

  setLetterIdx (newIdx) {
    if (newIdx === -1) {
      return;
    }
    if (this.endOfText(newIdx)) {
      this.finish();
      return;
    }
    this.letterIdx = newIdx;
    this.$activeLetter = this.l(newIdx);
    const prevTop = this.$cursor.position().top;
    const { top, left } = this.$activeLetter.position();
    this.$cursor.css({ top, left });
    this.adjustTextContainerHeight(prevTop, top);
  }

  endOfText (idx) {
    return idx === this.letters.length;
  }

  l (idx) {
    return $('#l-' + idx);
  }

  cursorInterval () {
    this.$cursor.toggleClass('active');
  }

  adjustTextContainerHeight (prevCursorTop, cursorTop) {
    // todo [adgo] - handle backspacing to first line
    if (cursorTop < 126) {
      return;
    }
    if (cursorTop > prevCursorTop) {
      this.$textContainer.animate({ marginTop: '-=60px' }, 500);
      return;
    }
    if (cursorTop < prevCursorTop) {
      this.$textContainer.animate({ marginTop: '+=60px' }, 500);
      return;
    }
  }

  finish () {
    clearInterval(this._cursorInterval);
    window.alert('finished!');
  }

  shouldIgnore (key, ctrlKey, altKey) {
    if (ctrlKey || altKey) {
      return true;
    }
    if (some(this.ignoredKeys, k => k === key)) {
      return true;
    }
  }
  getIgnoredKeys () {
    return [ 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Shift', 'Control', 'CapsLock', 'Alt', 'Tab' ];
  }
}
