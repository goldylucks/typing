'use strict';

const url = 'http://localhost:3000/texts/' + '56f04089cab8bfde77c236d3';
const finishUrl = 'http://localhost:3000/finish/' + '56f04089cab8bfde77c236d3';
const text = 'Check my awesome text it is so fucking awesome!';

module.exports = {
  tags: ['Text Page'],

  before (client) {
    client.url(url).waitForElementVisible('body', 1000);
  },

  'Assert url' (client) {
    client.assert.urlEquals(url);
  },

  'Assert ui' (client) {
    client.expect.element('#text-container').text.to.contain(text);
    client.expect.element('.wpm').text.to.contain('wpm:');
    client.expect.element('#wpm').text.to.equal('0');
    client.expect.element('.accuracy').text.to.contain('accuracy: 0%');
    client.expect.element('#accuracy').text.to.equal('0');
  },

  'Assert blinking cursor' (client) {
    client.expect.element('#cursor').to.have.attribute('class').equals('cursor').before(2000);
    client.expect.element('#cursor').to.have.attribute('class').equals('cursor active').before(2000);
  },

  // onice, see https://github.com/seleniumhq/selenium/issues/386
  // selenium keys don't send the .key property
  // if selenium won't fix that, switch back to keycodes in text component
  // to allow testing
  'Assert keys class' (client) {
    client.expect.element('#l-0').to.have.attribute('class').equals('letter');
    // test correct letter
    client.keys('C');
    client.expect.element('#l-0').to.have.attribute('class').contains('letter');
    client.expect.element('#l-0').to.have.attribute('class').contains('dirty');
    // client.expect.element('#l-0').to.have.attribute('class').which.contains('correct');
    // client.expect.element('#l-0').to.have.attribute('class').which.not.contains('wrong');
    // client.expect.element('#wpm').text.to.be.above(1); // todo [adgo] - implement
    // set runningWpm;
    // client.expect.element('#accuracy').text.to.equal('100');
    // test wrong letter
    client.keys('H');
    client.expect.element('#l-1').to.have.attribute('class').contains('letter');
    client.expect.element('#l-1').to.have.attribute('class').contains('dirty');
    client.expect.element('#l-1').to.have.attribute('class').not.contains('correct');
    client.expect.element('#l-1').to.have.attribute('class').contains('wrong');
    client.expect.element('#l-1').to.have.attribute('class').contains('was-wrong');
    // client.expect.element('#wpm').text.to.be.below(runningWpm);
    // client.expect.element('#accuracy').text.to.equal('50');
    // test backspace wrong letter
    // client.keys([client.Keys.BACKSPACE]);
    // client.expect.element('#l-1').to.have.attribute('class').contains('letter');
    // client.expect.element('#l-1').to.have.attribute('class').contains('dirty');
    // client.expect.element('#l-1').to.have.attribute('class').which.not.contains('correct');
    // client.expect.element('#l-1').to.have.attribute('class').which.not.contains('wrong');
    // client.expect.element('#l-1').to.have.attribute('class').contains('was-wrong');
    // test backspace correct letter
    // client.keys([client.Keys.BACKSPACE]);
    // client.expect.element('#l-0').to.have.attribute('class').contains('letter');
    // client.expect.element('#l-0').to.have.attribute('class').contains('dirty');
    // client.expect.element('#l-0').to.have.attribute('class').which.not.contains('correct');
    // client.expect.element('#l-0').to.have.attribute('class').which.not.contains('wrong');
    // client.expect.element('#l-0').to.have.attribute('class').which.not.contains('was-wrong');
  },

  'Assert stats' (client) {
    // letterIdx < 10 --> wpm < 160
    // cases: wrong/correct key, backspace on wrong correct/key
    // wpm
    // accuracy
  },

  'Assert adjust container hight' (client) {

  },

  'Assert adjust cursor hight' (client) {

  },

  'Assert navigate to finish page' (client) {
    client.keys(text.slice(0));
    client.assert.urlEquals(finishUrl);
  },

  after (client) {
    client.end();
  }
};
