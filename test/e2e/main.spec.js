'use strict';

const url = 'http://localhost:3000/';
const textUrl = 'http://localhost:3000/texts/';
const navUrl = 'http://localhost:3000/nav';
const text = {
  title: 'Test text title',
  body: 'Test text body'
};

module.exports = {
  tags: ['MainPage'],

  before (client) {
    client.url(url).waitForElementVisible('body', 20000);
    client.waitForElementVisible('#title', 20000);
  },

  'Assert url' (client) {
    client.assert.urlEquals(url);
  },

  'Assert adding text' (client) {
    client.setValue('#title', text.title);
    client.setValue('#body', text.body);
    client.click('#submit');
    client.assert.urlContains(textUrl);
    client.expect.element('#text').text.to.equal(text.body);
    // go back
    client.url(url).waitForElementVisible('[href="/nav"]', 20000);
  },

  'Assert nav link' (client) {
    client.click('[href="/nav"]');
    client.assert.urlEquals(navUrl);
    // go back
    client.url(url).waitForElementVisible('body', 20000);
  },

  'Assert typingclub link' (client) {
    client.waitForElementVisible('[href="//typingclub.com"]', 10000);
  },

  after (client) {
    client.end();
  }

};
