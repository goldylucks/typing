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
    client.url(url).waitForElementVisible('body', 1000);
    client.assert.urlEquals(url);
  },

  'Assert adding text' (client) {
    client.setValue('#title', text.title);
    client.setValue('#body', text.body);
    client.click('#submit');
    client.waitForElementVisible('#text-container', 1000);
    client.assert.urlContains(textUrl);
    client.expect.element('#text').text.to.equal(text.body);
    client.url(url).waitForElementVisible('body', 1000);
  },

  'Assert nav link' (client) {
    client.click('[href="/nav"]');
    client.assert.urlEquals(navUrl);
    client.url(url).waitForElementVisible('body', 1000);
  },

  'Assert typingclub link' (client) {
    client.click('[href="//typingclub.com"]');
    client.window_handles(result => {
      client.switchWindow(result.value[1]);
      client.assert.urlContains('typingclub.com');
    });
  },

  after (client) {
    client.end();
  }

};
