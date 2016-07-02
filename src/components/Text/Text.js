import $ from 'jquery';
import keyMap from './keymap.json';

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
  }

  renderLetters () {
    const $letters = this.letters.map((l, idx) => $(`<span id=l-${idx} class='letter'>${l}</span>`));
    $('#text').append($letters);
  }

  onKeyDown (evt) {
    evt.preventDefault();
    let key = keyMap[String(evt.which)];
    if (key === 'shift') {
      return;
    }
    this.$activeLetter.removeClass('active');
    if (key === 'backspace') {
      this.setLetterIdx(this.letterIdx - 1); // mutates this.$activeLetter
      this.$activeLetter.removeClass('wrong correct');
      return;
    }
    if (evt.shiftKey) {
      key = key.toUpperCase();
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

}
