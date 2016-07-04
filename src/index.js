import $ from 'jquery';
import str from './texts/positiveAffirmations.txt';
import Text from './components/Text';
import Stats from './components/Stats';
import './index.html';

const letters = str.split('');
const text = new Text(letters);
const stats = new Stats();

$(document).ready(init);

function init () {
  text.init();
  stats.init();
}
