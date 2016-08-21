import $ from 'jquery';
import { some } from 'lodash';
import styles from './Text.css';

export default class Text {

  ignoredKeys = this.getIgnoredKeys();

  constructor (letters) {
    this.letters = letters;
  }

  render () {
    return `
      <div class=${styles.textHeightContainer}>
        <div id='text-container' class=${styles.textContainer}>
          <div id='text'></div>
          <div id='cursor' class=${styles.cursor} style='top: 8px;'></div>
        </div>
      </div>
    `;
  }

  init () {
    this.renderLetters();
    this.$cursor = $('#cursor');
    this.$textContainer = $('#text-container');
    this._cursorInterval = setInterval(this.cursorInterval, 300);
  }

  renderLetters () {
    const $letters = this.letters.map((l, idx) => $(`<span id=l-${idx} class=${styles.letter}>${l}</span>`));
    $('#text').append($letters);
  }

  onKeyDown = (evt, letterIdx) => {
    const { key, ctrlKey, altKey } = evt;
    if (this.shouldIgnore(key, ctrlKey, altKey)) {
      return { shouldIgnore: true };
    }

    const $activeLetter = this.l(letterIdx);
    $activeLetter.removeClass(styles.active).addClass(styles.dirty);
    const $nextLetter = key === 'Backspace' ? this.l(letterIdx - 1) : this.l(letterIdx + 1);

    if (key === 'Backspace') {
      if (letterIdx === 0) {
        return;
      }
      const scoreChange = this.lWasCorrect($nextLetter) ? -1 : 0;
      $nextLetter.removeClass(`${styles.wrong} ${styles.correct}`);
      this.adjustCursorPosition($nextLetter);
      this.adjustTextContainerHeight($activeLetter, $nextLetter);
      return { idxChange: -1, scoreChange };
    }

    const keyIsCorrect = key === this.letters[letterIdx];
    const klass = keyIsCorrect ? styles.correct : `${styles.wrong} ${styles.wasWrong}`;
    const scoreChange = keyIsCorrect ? 1 : 0;
    $activeLetter.addClass(klass);
    const isFinished = this.endOfText(letterIdx + 1);
    if (isFinished) {
      this.onFinish();
    } else {
      this.adjustCursorPosition($nextLetter);
      this.adjustTextContainerHeight($activeLetter, $nextLetter);
    }
    return { idxChange: 1, scoreChange, isFinished };
  }

  lWasCorrect ($activeLetter) {
    return $activeLetter.attr('class').match('correct');
  }

  endOfText (idx) {
    return idx === this.letters.length;
  }

  l (idx) {
    return $('#l-' + idx);
  }

  cursorInterval = () => {
    this.$cursor.toggleClass(styles.active);
  }

  adjustCursorPosition ($nextLetter) {
    const { top, left } = $nextLetter.position();
    this.$cursor.css({ top, left });
  }

  adjustTextContainerHeight ($activeLetter, $nextLetter) {
    const prevTop = $activeLetter.position().top;
    const { top } = $nextLetter.position();
    // todo [adgo] - handle backspacing to first line
    if (top < 126) {
      return;
    }
    if (top > prevTop) {
      this.$textContainer.animate({ marginTop: '-=60px' }, 500);
      return;
    }
    if (top < prevTop) {
      this.$textContainer.animate({ marginTop: '+=60px' }, 500);
      return;
    }
  }

  onFinish () {
    clearInterval(this._cursorInterval);
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
