'use strict';

const url = 'http://localhost:3000/add-text';
const textUrl = 'http://localhost:3000/texts/';
const text = {
  title: 'Test add text title',
  body: 'Test add text body'
};

module.exports = {
  tags: ['AddPage'],

  before (client) {
    client.url(url).waitForElementVisible('body', 20000);
    client.assert.urlEquals(url);
  },

  'Assert adding text' (client) {
    client.setValue('#title', text.title);
    client.setValue('#body', text.body);
    client.click('#submit');
    client.waitForElementVisible('#text-container', 20000);
    client.assert.urlContains(textUrl);
    client.expect.element('#text').text.to.equal(text.body);
    client.url(url).waitForElementVisible('body', 20000);
  },

  after (client) {
    client.end();
  }

};
