'use strict';

const url = 'http://localhost:3000/text';

module.exports = {
  tags: ['Text Page'],

  before (client) {
    client.url(url).pause(1000);
  },

  'Assert url' (client) {
    client.assert.urlContains('/text');
  },

  'Assert main text' (client) {
    client.expect.element('#text').to.be.present;
  },

  after (client) {
    client.end();
  }
};
